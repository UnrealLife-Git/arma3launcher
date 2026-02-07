import { useEffect, useState } from 'react'
import { Folder, Download, Play, Settings, AlertCircle, CheckCircle, Clock, Radio, Monitor, X, Minimize, Server, ExternalLink } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import { config } from './config/config'

type LauncherState = 'idle' | 'locating' | 'downloading' | 'launching' | 'ready' | 'checking'
type TabType = 'home' | 'news' | 'servers' | 'mods' | 'links' | 'settings'

function App() {
  const [state, setState] = useState<LauncherState>('idle')
  const [activeTab, setActiveTab] = useState<TabType>('home')
  const [arma3Path, setArma3Path] = useState<string | null>(null)
  const [progress, setProgress] = useState<number>(0)
  const [fileProgress, setFileProgress] = useState<number>(0)
  const [fileName, setFileName] = useState<string>('')
  const [eta, setEta] = useState<string>('')
  const [modsStatus, setModsStatus] = useState<'synced' | 'outdated' | 'downloading'>('synced')
  const [playerCount, setPlayerCount] = useState<number>(0)
  const [maxPlayers, setMaxPlayers] = useState<number>(config.servers[0].maxSlots)
  const [serverStatus, setServerStatus] = useState<'online' | 'offline'>('offline')
  const [serverName, setServerName] = useState<string>(config.servers[0].name)
  const [serverMap, setServerMap] = useState<string>('')
  const [serverPing, setServerPing] = useState<number>(0)
  const [serverFps, setServerFps] = useState<number>(0)
  const [serverUptime, setServerUptime] = useState<string>('0:00:00')
  const [hasRconData, setHasRconData] = useState<boolean>(false)
  const [news, setNews] = useState<any[]>([])
  const [criticalNews, setCriticalNews] = useState<any[]>([])
  const [lastToastMessage, setLastToastMessage] = useState<string>('')

  // État pour la gestion multi-serveurs
  const [selectedServerId, setSelectedServerId] = useState<string>(
    config.servers.find(s => s.isDefault)?.id || config.servers[0]?.id || ''
  )
  const selectedServer = config.servers.find(s => s.id === selectedServerId) || config.servers[0]

  // Mise à jour autoUpdater
  const [updateVisible, setUpdateVisible] = useState<boolean>(false)
  const [updateMessage, setUpdateMessage] = useState<string>('')
  const [updatePercent, setUpdatePercent] = useState<number>(0)
  const [updateSpeed, setUpdateSpeed] = useState<number>(0)
  const [updateTransferred, setUpdateTransferred] = useState<number>(0)
  const [updateTotal, setUpdateTotal] = useState<number>(0)

  useEffect(() => {
    const handleMessage = (_e: any, payload: any) => {
      const { message, success, error, data, fileProgress, timeRemaining } = payload
      const toastKey = `${message}-${success || error || ''}`

      if (lastToastMessage === toastKey) return

      if (message === 'arma3Path-ready' || message === 'arma3Path-mod-loaded') {
        setState('ready')
        setLastToastMessage(toastKey)
        setTimeout(() => setLastToastMessage(''), 1000)
      }
      if (message === 'arma3Path-not-loaded' || message === 'arma3Path-invalid') {
        setState('idle')
        setLastToastMessage(toastKey)
        toast.error('❌ ' + (error || 'Chemin invalide'), { id: 'arma3-error' })
        setTimeout(() => setLastToastMessage(''), 1000)
      }
      if (message === 'updateMod-needed') {
        setState('ready')
        setModsStatus('outdated')
        if (lastToastMessage !== toastKey) {
          setLastToastMessage(toastKey)
          toast('📦 Mods à synchroniser', { id: 'mods-update' })
          setTimeout(() => setLastToastMessage(''), 1000)
        }
      }
      if (message === 'mods-check-complete') {
        setState('ready')
        setModsStatus('synced')
        // Reset des barres de progression si les mods sont déjà à jour
        setProgress(0)
        setFileProgress(0)
        setFileName('')
        setEta('')

        if (lastToastMessage !== toastKey) {
          setLastToastMessage(toastKey)
          setTimeout(() => setLastToastMessage(''), 1000)
        }
      }
      if (message === 'cleanup-start') {
        setState('downloading')
        setModsStatus('downloading')
        if (lastToastMessage !== toastKey) {
          setLastToastMessage(toastKey)
          toast.loading('🗑️ ' + (success || 'Nettoyage en cours...'), { id: 'cleanup' })
          setTimeout(() => setLastToastMessage(''), 1000)
        }
      }
      if (message === 'cleanup-complete') {
        if (lastToastMessage !== toastKey) {
          setLastToastMessage(toastKey)
          toast.success('✅ ' + (success || 'Nettoyage terminé'), { id: 'cleanup' })
          setTimeout(() => setLastToastMessage(''), 1000)
        }
      }
      if (message === 'download-start') {
        setState('downloading')
        setModsStatus('downloading')
      }
      if (message === 'download-progress') {
        setProgress(Number(success || 0))
        setFileProgress(Number(fileProgress || 0))
        setFileName(String(data || ''))
        setEta(String(timeRemaining || ''))
      }
      if (message === 'download-complete') {
        setState('ready')
        setModsStatus('synced')
        // Reset des barres de progression après un délai pour voir la completion
        setTimeout(() => {
          setProgress(0)
          setFileProgress(0)
          setFileName('')
          setEta('')
        }, 2000) // 2 secondes pour voir 100% puis disparition

        if (lastToastMessage !== toastKey) {
          setLastToastMessage(toastKey)
          toast.success('✅ Mods synchronisés avec succès', { id: 'download-complete' })
          setTimeout(() => setLastToastMessage(''), 1000)
        }
      }
      if (message === 'download-error') {
        setState('ready')
        setModsStatus('outdated')
        // Reset des barres de progression en cas d'erreur
        setProgress(0)
        setFileProgress(0)
        setFileName('')
        setEta('')

        if (lastToastMessage !== toastKey) {
          setLastToastMessage(toastKey)
          toast.error('❌ ' + (error || 'Erreur de téléchargement'), { id: 'download-error' })
          setTimeout(() => setLastToastMessage(''), 1000)
        }
      }
      if (message === 'tfar-install-start') {
        toast.loading('📦 Installation TFAR...', { id: 'tfar-install' })
      }
      if (message === 'tfar-install-success') {
        toast.success('✅ ' + (success || 'TFAR installé'), { id: 'tfar-install' })
      }
      if (message === 'tfar-install-error') {
        toast.error('❌ ' + (error || 'Erreur installation TFAR'), { id: 'tfar-install' })
      }
      if (message === 'launch-game-success') {
        if (lastToastMessage !== toastKey) {
          setLastToastMessage(toastKey)
          toast.success('🚀 Jeu lancé avec succès !', { id: 'game-launch' })
          setTimeout(() => setLastToastMessage(''), 1000)
        }
      }
      if (message === 'server-info-update') {
        try {
          const defaultServer = config.servers.find(s => s.isDefault) || config.servers[0]
          const serverInfo = JSON.parse(data || '{}')
          if (serverInfo && serverInfo.isOnline) {
            setHasRconData(true)
            setPlayerCount(serverInfo.playerCount || 0)
            setMaxPlayers(serverInfo.maxPlayers || defaultServer.maxSlots)
            setServerStatus('online')
            setServerName(serverInfo.serverName || defaultServer.name)
            setServerMap(serverInfo.map || 'Unknown')
            setServerPing(serverInfo.ping || 0)
            setServerFps(serverInfo.fps || 0)
            setServerUptime(serverInfo.uptime || '0:00:00')
          } else {
            // Serveur hors ligne - pas d'infos fantômes
            setHasRconData(false)
            setServerStatus('offline')
            setPlayerCount(0)
            setServerPing(0)
            setServerFps(0)
            setServerUptime('0:00:00')
          }
        } catch (error) {
          console.error('Erreur parsing server info:', error)
          setHasRconData(false)
          setServerStatus('offline')
          setPlayerCount(0)
          setServerPing(0)
          setServerFps(0)
        }
      }
    }

    window.ipcRenderer.on('main-process-message', handleMessage)

    window.ipcRenderer.invoke('get-arma3-path').then((path) => {
      if (path) {
        setArma3Path(path)
        setState('ready')
      }
    })

    // Récupérer les infos serveur au démarrage
    window.ipcRenderer.invoke('get-server-info').then((serverInfo) => {
      if (serverInfo && serverInfo.isOnline) {
        setHasRconData(true)
        setPlayerCount(serverInfo.playerCount || 0)
        setMaxPlayers(serverInfo.maxPlayers || config.servers[0].maxSlots)
        setServerStatus('online')
        setServerName(serverInfo.serverName || config.servers[0].name)
        setServerMap(serverInfo.map || '')
        setServerPing(serverInfo.ping || 0)
        setServerFps(serverInfo.fps || 0)
        setServerUptime(serverInfo.uptime || '0:00:00')
      } else {
        // Pas d'infos disponibles = serveur hors ligne
        setHasRconData(false)
        setServerStatus('offline')
        setPlayerCount(0)
        setServerPing(0)
        setServerFps(0)
        setServerName(config.servers[0].name) // Garder le nom de config
        setServerMap('') // Garder la map de config
      }
    })

    // Récupérer les actualités
    window.ipcRenderer.invoke('get-news').then((newsItems) => {
      if (newsItems) {
        setNews(newsItems)
      }
    })

    // Récupérer les actualités critiques
    window.ipcRenderer.invoke('get-critical-news').then((criticalItems) => {
      if (criticalItems) {
        setCriticalNews(criticalItems)
      }
    })

    return () => {
      window.ipcRenderer.off('main-process-message', handleMessage)
    }
  }, [lastToastMessage])

  // Auto-refresh du statut serveur toutes les 30 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      // Seulement si on n'est pas en train de télécharger ou autre
      if (state === 'ready' || state === 'idle') {
        window.ipcRenderer.invoke('get-server-info').then((serverInfo) => {
          if (serverInfo && serverInfo.isOnline) {
            setHasRconData(true)
            setPlayerCount(serverInfo.playerCount || 0)
            setMaxPlayers(serverInfo.maxPlayers || config.servers[0].maxSlots)
            setServerStatus('online')
            setServerName(serverInfo.serverName || config.servers[0].name)
            setServerMap(serverInfo.map || '')
            setServerPing(serverInfo.ping || 0)
            setServerFps(serverInfo.fps || 0)
            setServerUptime(serverInfo.uptime || '0:00:00')
          } else {
            setHasRconData(false)
            setServerStatus('offline')
            setPlayerCount(0)
            setServerPing(0)
            setServerFps(0)
            setServerName(config.servers[0].name)
            setServerMap('')
          }
        })
      }
    }, 30000) // 30 secondes

    return () => clearInterval(interval)
  }, [state])

  // Événements d'auto‑mise à jour
  useEffect(() => {
    const onChecking = () => {
      setUpdateVisible(true)
      setUpdateMessage('Recherche de mise à jour...')
      setUpdatePercent(0)
    }
    const onAvailable = () => {
      setUpdateVisible(true)
      setUpdateMessage('Mise à jour disponible — téléchargement en cours...')
    }
    const onProgress = (_e: any, data: { percent: number; transferred: number; total: number; bytesPerSecond: number }) => {
      const percent = Math.round(Number(data?.percent || 0))
      setUpdatePercent(percent)
      setUpdateTransferred(Number(data?.transferred || 0))
      setUpdateTotal(Number(data?.total || 0))
      setUpdateSpeed(Number(data?.bytesPerSecond || 0))
      setUpdateVisible(true)
      setUpdateMessage('Téléchargement de la mise à jour...')
    }
    const onReady = () => {
      setUpdateVisible(true)
      setUpdatePercent(100)
      setUpdateMessage('Mise à jour téléchargée — redémarrage imminent...')
    }
    const onNotAvailable = () => {
      setUpdateVisible(false)
      setUpdatePercent(0)
      setUpdateMessage('')
    }
    const onError = (_e: any, msg?: string) => {
      toast.error('❌ ' + (msg || 'Erreur de mise à jour'))
      setUpdateVisible(false)
      setUpdatePercent(0)
      setUpdateMessage('')
    }

    window.ipcRenderer.on('checking-update', onChecking)
    window.ipcRenderer.on('update-available', onAvailable)
    window.ipcRenderer.on('update-progress', onProgress as any)
    window.ipcRenderer.on('update-ready', onReady)
    window.ipcRenderer.on('update-not-available', onNotAvailable)
    window.ipcRenderer.on('update-error', onError as any)

    return () => {
      window.ipcRenderer.off('checking-update', onChecking)
      window.ipcRenderer.off('update-available', onAvailable)
      window.ipcRenderer.off('update-progress', onProgress as any)
      window.ipcRenderer.off('update-ready', onReady)
      window.ipcRenderer.off('update-not-available', onNotAvailable)
      window.ipcRenderer.off('update-error', onError as any)
    }
  }, [])

  const handleLocate = async () => {
    setState('locating')
    window.ipcRenderer.send('locate-arma3')
    const path = await window.ipcRenderer.invoke('get-arma3-path')
    setArma3Path(path)
  }

  const handleDownload = () => {
    setState('downloading')
    setProgress(0)
    setFileProgress(0)
    window.ipcRenderer.send('download-mods')
  }

  const handleRefresh = () => {
    setState('checking')
    // Ne pas changer le modsStatus pendant la vérification pour éviter le clignotement
    window.ipcRenderer.send('check-mods')
  }

  const handleRefreshServerStatus = () => {
    setState('checking')
    // Relancer la vérification du serveur et des mods
    window.ipcRenderer.invoke('get-server-info').then((serverInfo) => {
      if (serverInfo && serverInfo.isOnline) {
        setHasRconData(true)
        setPlayerCount(serverInfo.playerCount || 0)
        setMaxPlayers(serverInfo.maxPlayers || config.servers[0].maxSlots)
        setServerStatus('online')
        setServerName(serverInfo.serverName || config.servers[0].name)
        setServerMap(serverInfo.map || '')
        setServerPing(serverInfo.ping || 0)
        setServerFps(serverInfo.fps || 0)
        setServerUptime(serverInfo.uptime || '0:00:00')
      } else {
        setHasRconData(false)
        setServerStatus('offline')
        setPlayerCount(0)
        setServerPing(0)
        setServerFps(0)
        setServerName(config.servers[0].name)
        setServerMap('')
      }
      setState('ready')
    })
    // Vérifier aussi les mods
    window.ipcRenderer.send('check-mods')
  }

  const handleLaunch = () => {
    setState('launching')
    window.ipcRenderer.invoke('launch-game')
    setTimeout(() => setState('ready'), 2000)
  }

  const handleClose = () => {
    window.ipcRenderer.send('close-app')
  }

  const handleMinimize = () => {
    window.ipcRenderer.send('minimize-app')
  }



  return (
    <div className="min-h-screen relative overflow-hidden scan-lines">
      {updateVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md card-military p-6 border border-orange-600/30">
            <div className="flex items-center space-x-3 mb-4">
              <Download className="w-6 h-6 text-orange-400 animate-bounce" />
              <h3 className="text-lg font-bold text-orange-200">Mise à jour en cours</h3>
            </div>
            <p className="text-sm text-gray-300 mb-4">{updateMessage}</p>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Progression</span>
                <span className="text-white font-mono">{updatePercent}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${updatePercent}%` }} />
              </div>
              {(updateTotal > 0) && (
                <div className="text-xs text-gray-400 flex justify-between">
                  <span>{(updateTransferred / 1024 / 1024).toFixed(1)} / {(updateTotal / 1024 / 1024).toFixed(1)} Mo</span>
                  <span>{(updateSpeed / 1024 / 1024).toFixed(1)} Mo/s</span>
                </div>
              )}
              <div className="text-xs text-gray-500">L'application redémarrera automatiquement une fois prête.</div>
            </div>
          </div>
        </div>
      )}
      {/* Barre de titre personnalisée avec drag */}
      <div
        className="fixed top-0 left-0 right-0 h-9 titlebar-gradient backdrop-blur-md border-b border-orange-600/30 z-50 flex items-center justify-between px-4"
        style={{ WebkitAppRegion: 'drag' } as any}
      >
        <div className="flex items-center space-x-2">
          <div className="titlebar-dot titlebar-dot-red"></div>
          <div className="titlebar-dot titlebar-dot-orange"></div>
          <div className="titlebar-dot titlebar-dot-green"></div>
        </div>
        <div className="text-xs text-orange-200 font-mono font-semibold tracking-wider">{config.launcher.name.toUpperCase()} V.{config.launcher.version}</div>
        <div className="flex items-center space-x-2" style={{ WebkitAppRegion: 'no-drag' } as any}>
          <button
            onClick={handleMinimize}
            className="titlebar-btn titlebar-btn-minimize group"
            title="Réduire"
          >
            <Minimize className="w-3 h-3 text-gray-300 group-hover:text-white transition-colors duration-200" />
          </button>
          <button
            onClick={handleClose}
            className="titlebar-btn titlebar-btn-close group"
            title="Fermer"
          >
            <X className="w-3 h-3 text-gray-300 group-hover:text-white transition-colors duration-200" />
          </button>
        </div>
      </div>

      {/* Padding pour compenser la barre de titre */}
      <div className="pt-9">
        {/* Particles d'arrière-plan */}
        <div className="particles">
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${8 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1f2937',
              color: '#f1f5f9',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '0.75rem',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }
          }}
          containerStyle={{
            top: 40,
            right: 20,
          }}
          gutter={8}
        />


        {/* Navigation tabs - Responsive */}
        <div className="relative bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-xl border-b border-orange-600/20 shadow-lg">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex overflow-x-auto scrollbar-hide">
              {[
                { id: 'home', label: 'Accueil', icon: Monitor },
                { id: 'news', label: 'News', icon: Radio },
                //{ id: 'servers', label: 'Serveurs', icon: Server },
                { id: 'mods', label: 'Mods', icon: Download },
                { id: 'links', label: 'Liens', icon: ExternalLink },
                { id: 'settings', label: 'Config', icon: Settings }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as TabType)}
                  className={`nav-tab flex-shrink-0 ${activeTab === id ? 'active' : ''}`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto p-4">
          {/* Alerte synchronisation */}
          {modsStatus === 'outdated' && activeTab === 'mods' && (
            <div className="mb-6 relative animate-in">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-lg blur-sm" />
              <div className="relative card-military p-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 arma-gradient rounded-full pulse-glow">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-orange-200 font-bold">⚠️ Synchronisation requise</p>
                    <p className="text-orange-300/90 text-sm">Les mods du serveur doivent être synchronisés</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contenu des onglets */}
          {activeTab === 'home' && <HomeTab
            arma3Path={arma3Path}
            serverStatus={serverStatus}
            playerCount={playerCount}
            maxPlayers={maxPlayers}
            serverName={serverName}
            serverMap={serverMap}
            serverPing={serverPing}
            serverFps={serverFps}
            serverUptime={serverUptime}
            hasRconData={hasRconData}
            modsStatus={modsStatus}
            state={state}
            selectedServer={selectedServer}
            servers={config.servers}
            selectedServerId={selectedServerId}
            onSelectServer={setSelectedServerId}
            onConnect={() => window.ipcRenderer.invoke('connect-server', selectedServerId)}
            onRefreshStatus={handleRefreshServerStatus}
          />}
          {activeTab === 'news' && <NewsTab
            news={news}
            criticalNews={criticalNews}
          />}
          {activeTab === 'servers' && <ServersTab
            servers={config.servers}
            selectedServerId={selectedServerId}
            onSelectServer={setSelectedServerId}
            serverStatus={serverStatus}
            playerCount={playerCount}
            serverPing={serverPing}
            modsStatus={modsStatus}
            onConnect={() => window.ipcRenderer.invoke('connect-server', selectedServerId)}
          />}
          {activeTab === 'mods' && <ModsTab
            state={state}
            progress={progress}
            fileProgress={fileProgress}
            fileName={fileName}
            eta={eta}
            modsStatus={modsStatus}
            onDownload={handleDownload}
            onRefresh={handleRefresh}
          />}
          {activeTab === 'links' && <LinksTab />}
          {activeTab === 'settings' && <SettingsTab
            arma3Path={arma3Path}
            onLocate={handleLocate}
            onLaunch={handleLaunch}
            state={state}
          />}
        </div>
      </div>
    </div>
  )
}

// Composant Onglet Accueil
function HomeTab({
  serverStatus,
  playerCount,
  maxPlayers,
  modsStatus,
  state,
  selectedServer,
  //@ts-ignore
  servers,
  //@ts-ignore
  selectedServerId,
  //@ts-ignore
  onSelectServer,
  onConnect,
  onRefreshStatus
}: {
  arma3Path: string | null
  serverStatus: string
  playerCount: number
  maxPlayers: number
  serverName: string
  serverMap: string
  serverPing: number
  serverFps: number
  serverUptime: string
  hasRconData: boolean
  modsStatus: 'synced' | 'outdated' | 'downloading'
  state: LauncherState
  selectedServer: any
  servers: any[]
  selectedServerId: string
  onSelectServer: (serverId: string) => void
  onConnect: () => void
  onRefreshStatus: () => void
}) {
  return (
    <div className="space-y-4">
      {/* Hero - Accueillant et Responsive */}
      <div className="hero-container relative overflow-hidden rounded-2xl">
        {/* Background avec effet parallax */}
        <div className="absolute inset-0 hero-bg opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/10 via-transparent to-blue-900/10"></div>

        {/* Contenu principal */}
        <div className="relative z-10 p-4 sm:p-6">
          <div className="max-w-5xl mx-auto">
            {/* Badge et titre principal */}
            <div className="text-center mb-4 sm:mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                <span className="text-orange-300 text-sm font-medium uppercase tracking-wider">Serveur Français • Semi‑RP</span>
              </div>

              <h2 className="hero-title text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-200 via-orange-100 to-orange-200 leading-tight mb-3">
                CHANGEZ DE VIE
              </h2>

              <p className="text-base text-orange-200/90 font-light max-w-2xl mx-auto leading-relaxed mb-4">
                Rejoignez <span className="font-semibold text-orange-100">UnrealLife</span>, le serveur ARMA III RPG nouvelle génération.
              </p>

              {/* Stats en temps réel */}
              <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mb-4">
                <div className="stats-card-compact">
                  <div className="text-xl font-bold text-green-400">{playerCount}</div>
                  <div className="text-xs text-gray-400">Joueurs</div>
                </div>
                <div className="stats-card-compact">
                  <div className="text-xl font-bold text-blue-400">{maxPlayers - playerCount}</div>
                  <div className="text-xs text-gray-400">Places</div>
                </div>
                <div className="stats-card-compact">
                  <div className={`text-xl font-bold ${serverStatus === 'online' ? 'text-green-400' : 'text-red-400'}`}>
                    {serverStatus === 'online' ? '🟢' : '🔴'}
                  </div>
                  <div className="text-xs text-gray-400">{serverStatus === 'online' ? 'En ligne' : 'Hors ligne'}</div>
                </div>
              </div>
            </div>

            {/* Badges de statut */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <span className="badge badge--success">
                <CheckCircle className="w-3 h-3" />
                Ouverture prochainement
              </span>
              {/*<span className="badge badge--info">
                <Target className="w-3 h-3" />
                BETA Ouverte
              </span>*/}
            </div>

            {/* Sélecteur de serveur

            {servers.length > 1 && (
              <div className="mb-6">
                <div className="text-center mb-4">
                  <label className="inline-flex items-center gap-2 text-sm text-orange-200/80 font-medium">
                    <Server className="w-4 h-4" />
                    Choisissez votre serveur
                  </label>
                  <p className="text-xs text-gray-400 mt-1">Sélectionnez le serveur sur lequel vous souhaitez jouer</p>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  {servers.map((server, index) => (
                    <button
                      key={server.id}
                      onClick={() => onSelectServer(server.id)}
                      className={`server-selector ${server.id === selectedServerId
                        ? 'server-selector-active'
                        : 'server-selector-inactive'
                        }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <span className="server-name text-sm">{server.shortName}</span>
                      <span className={`server-status ${server.status === 'production' ? 'server-status-production' :
                        server.status === 'beta' ? 'server-status-beta' :
                          'server-status-maintenance'
                        }`}>
                        {server.status === 'production' ? 'PROD' :
                          server.status === 'beta' ? 'BETA' : 'MAINT'}
                      </span>
                    </button>
                  ))}
                </div>
                {/* Indicateur du serveur sélectionné */}
            <div className="text-center mt-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-orange-300 font-medium">
                  {selectedServer?.name || 'Aucun serveur sélectionné'}
                </span>
              </div>
            </div>
          </div>


          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-2">
            {serverStatus === 'online' && modsStatus === 'synced' ? (
              <button
                onClick={onConnect}
                className="btn-join hero-cta-primary"
              >
                <Play className="w-5 h-5" />
                <span>Rejoindre le serveur</span>
              </button>
            ) : (
              <button
                onClick={onRefreshStatus}
                className="btn-join hero-cta-primary"
              >
                <Clock className={`w-5 h-5 ${state === 'checking' ? 'animate-spin' : 'animate-pulse'}`} />
                <span>{state === 'checking' ? 'Vérification...' : 'Actualiser le statut'}</span>
              </button>
            )}

            {/* Bouton Site Web déplacé pour ne pas être à côté de "Rejoindre le serveur" */}
          </div>

          {/* Info supplémentaire */}
          <div className="text-center mt-4 pt-3 border-t border-orange-600/20">
            <p className="text-xs text-gray-400 max-w-xl mx-auto">
              <span className="font-medium text-orange-300">90% contenu original</span> • Semi‑RP authentique
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Composant Onglet Actualités
function NewsTab({
  news,
  criticalNews
}: {
  news: any[]
  criticalNews: any[]
}) {
  // Éviter les doublons: retirer les actualités critiques de la liste générale
  const criticalIds = new Set((criticalNews || []).map((n: any) => n.id))
  const filteredNews = (news || []).filter((n: any) => !criticalIds.has(n.id))

  return (
    <div className="space-y-4">
      {/* Header de la section News */}
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-orange-100 mb-2">📰 Actualités UnRealLife</h2>
        <p className="text-sm text-gray-400 max-w-xl mx-auto">
          Dernières nouvelles et événements du serveur
        </p>
      </div>

      {/* Actualités critiques */}
      {criticalNews.length > 0 && (
        <div className="card-military animate-in">
          <div className="flex items-center space-x-3 mb-4">
            <AlertCircle className="w-5 h-5 text-red-400 animate-pulse" />
            <h3 className="text-lg font-bold text-red-200">🚨 Actualités importantes</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {criticalNews.map((item, i) => (
              <div key={i} className="p-4 bg-red-900/20 border border-red-600/30 rounded-lg hover:bg-red-900/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-red-200">{item.title}</h4>
                  <span className="text-xs text-red-300">{getNewsTypeEmoji(item.type)} {item.type.toUpperCase()}</span>
                </div>
                <p className="text-sm text-red-100/80 mb-3">{item.content}</p>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-red-300/70">Par {item.author}</div>
                  <div className="text-xs text-red-400">{formatDate(item.publishedAt)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actualités générales */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center space-x-2">
          <Radio className="w-4 h-4 text-orange-400" />
          <span>Actualités du serveur</span>
          <span className="text-xs bg-orange-900/30 text-orange-300 px-2 py-1 rounded-full">
            {filteredNews.length}
          </span>
        </h3>

        <div className="space-y-4">
          {filteredNews.length > 0 ? filteredNews.map((item, i) => (
            <div key={i} className={`news-article border-l-4 pl-6 pb-6 ${i < filteredNews.length - 1 ? 'border-b border-gray-700/50' : ''} ${getNewsBorderColor(item.type)}`}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                <div className="flex items-center space-x-3">
                  <h4 className="font-semibold text-gray-200 text-lg">{item.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${getNewsTypeClass(item.type)}`}>
                    {getNewsTypeEmoji(item.type)} {item.type}
                  </span>
                </div>
                <span className="text-xs text-gray-400">{formatDate(item.publishedAt)}</span>
              </div>

              <p className="text-sm text-gray-300 mb-4 leading-relaxed">{item.content}</p>

              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.tags.map((tag: string, tagI: number) => (
                    <span key={tagI} className="text-xs px-2 py-1 bg-gray-700/50 text-gray-300 rounded hover:bg-gray-700/70 transition-colors">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">Par {item.author}</div>
                {item.actionButton && (
                  <button
                    className="btn-secondary text-xs"
                    onClick={() => window.ipcRenderer.invoke('open-url', item.actionButton.url)}
                  >
                    {item.actionButton.text}
                  </button>
                )}
              </div>
            </div>
          )) : (
            <div className="text-center text-gray-400 py-12">
              <Radio className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h4 className="text-lg font-medium mb-2">Aucune actualité pour le moment</h4>
              <p className="text-sm">Les dernières nouvelles apparaîtront ici dès qu'elles seront disponibles.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Composant Onglet Serveurs
function ServersTab({
  servers,
  selectedServerId,
  onSelectServer,
  serverStatus,
  playerCount,
  serverPing,
  modsStatus,
  onConnect
}: {
  servers: any[]
  selectedServerId: string
  onSelectServer: (serverId: string) => void
  serverStatus: string
  playerCount: number
  serverPing: number
  modsStatus: 'synced' | 'outdated' | 'downloading'
  onConnect: () => void
}) {
  // const selectedServer = servers.find(s => s.id === selectedServerId) || servers[0]

  const getServerStatusColor = (status: string) => {
    switch (status) {
      case 'production': return 'text-green-400 bg-green-900/20 border-green-600/30'
      case 'beta': return 'text-blue-400 bg-blue-900/20 border-blue-600/30'
      case 'maintenance': return 'text-orange-400 bg-orange-900/20 border-orange-600/30'
      default: return 'text-gray-400 bg-gray-900/20 border-gray-600/30'
    }
  }

  const getServerStatusLabel = (status: string) => {
    switch (status) {
      case 'production': return 'Production'
      case 'beta': return 'Bêta'
      case 'maintenance': return 'Maintenance'
      default: return 'Inconnu'
    }
  }

  return (
    <div className="space-y-4">
      {/* Header avec sélection */}
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-orange-100 mb-2">🖥️ Serveurs Disponibles</h2>
        <p className="text-sm text-gray-400">
          Sélectionnez un serveur pour voir ses informations et vous connecter
        </p>
      </div>

      {/* Liste des serveurs */}
      <div className="grid grid-cols-1 gap-3">
        {servers.map((server) => {
          const isSelected = server.id === selectedServerId
          const isCurrentServerOnline = isSelected && serverStatus === 'online'

          return (
            <div
              key={server.id}
              onClick={() => onSelectServer(server.id)}
              className={`server-card cursor-pointer transition-all duration-300 ${isSelected
                ? 'server-card-selected border-orange-500/50 bg-gradient-to-r from-orange-900/20 to-orange-800/20'
                : 'server-card-default border-gray-600/30 hover:border-orange-500/30 hover:bg-gradient-to-r hover:from-gray-800/40 hover:to-gray-700/40'
                }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Indicateur de statut */}
                  <div className="flex flex-col items-center space-y-1">
                    <div className={`w-4 h-4 rounded-full ${isCurrentServerOnline ? 'bg-green-500 animate-pulse shadow-lg' : 'bg-red-500'
                      }`} />
                    <span className={`text-xs px-2 py-1 rounded-full border ${getServerStatusColor(server.status)}`}>
                      {getServerStatusLabel(server.status)}
                    </span>
                  </div>

                  {/* Infos serveur */}
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className={`font-bold text-lg ${isSelected ? 'text-orange-100' : 'text-gray-200'}`}>
                        {server.name}
                      </h4>
                      {server.isDefault && (
                        <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded-full border border-orange-500/30">
                          Défaut
                        </span>
                      )}
                    </div>
                    <p className={`text-sm mb-2 ${isSelected ? 'text-orange-200/90' : 'text-gray-300/80'}`}>
                      {server.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {server.tags.map((tag: string, i: number) => (
                        <span key={i} className="text-xs px-2 py-1 bg-gray-700/50 text-gray-300 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400">
                      IP: {server.ip} • Port: {server.port} • {server.maxSlots} slots
                      {server.whitelist && ' • Liste blanche'}
                    </p>
                  </div>
                </div>

                {/* Stats et bouton de connexion */}
                <div className="text-right flex-shrink-0">
                  {isSelected && isCurrentServerOnline ? (
                    <>
                      <div className="text-2xl font-bold text-green-400 mb-1">{playerCount}</div>
                      <div className="text-green-300/80 text-xs mb-1">Joueurs en ligne</div>
                      <div className="text-xs text-gray-400 mb-2">Ping: {serverPing}ms</div>
                      {modsStatus === 'synced' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            onConnect()
                          }}
                          className="btn-join btn-join-sm"
                        >
                          <Play className="w-4 h-4" />
                          <span>Rejoindre</span>
                        </button>
                      )}
                    </>
                  ) : isSelected ? (
                    <>
                      <div className="text-xl text-red-400 mb-1">
                        <Server className="w-6 h-6" />
                      </div>
                      <div className="text-red-300/80 text-xs">Hors ligne</div>
                    </>
                  ) : (
                    <div className="text-xs text-gray-500">Cliquer pour sélectionner</div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}

// Composant Onglet Mods
function ModsTab({ state, progress, fileProgress, fileName, eta, modsStatus, onDownload, onRefresh }: {
  state: LauncherState
  progress: number
  fileProgress: number
  fileName: string
  eta: string
  modsStatus: 'synced' | 'outdated' | 'downloading'
  onDownload: () => void
  onRefresh: () => void
}) {
  return (
    <div className="space-y-6">
      {/* Statut des mods */}
      <div className="relative overflow-hidden rounded-2xl card-military border border-orange-600/30 shadow-2xl max-w-3xl mx-auto">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)'
          }}
        />
        <div className="relative p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 arma-gradient rounded-full border border-orange-500/40 shadow-lg pulse-glow">
                <Download className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="text-2xl font-bold text-orange-100 leading-tight truncate">Synchronisation des mods</h3>
                <p className="text-orange-200/70 text-xs">Gérez et mettez à jour vos mods Arma 3</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-start md:justify-end gap-2 w-full md:w-auto">
              <div className={`shrink-0 flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${modsStatus === 'synced' ? 'bg-green-900/30 text-green-400 border border-green-600/30' :
                modsStatus === 'downloading' ? 'bg-blue-900/30 text-blue-400 border border-blue-600/30' :
                  'bg-orange-900/30 text-orange-400 border border-orange-600/30'
                }`}>
                {modsStatus === 'synced' && <CheckCircle className="w-3 h-3" />}
                {modsStatus === 'downloading' && <Download className="w-3 h-3 animate-bounce" />}
                {modsStatus === 'outdated' && <AlertCircle className="w-3 h-3" />}
                <span>
                  {modsStatus === 'synced' && 'Synchronisé'}
                  {modsStatus === 'downloading' && 'Téléchargement...'}
                  {modsStatus === 'outdated' && (state === 'checking' ? 'Vérification...' : 'Désynchronisé')}
                </span>
              </div>
              <button
                onClick={onRefresh}
                disabled={state === 'downloading' || state === 'checking'}
                className="btn-secondary shrink-0"
                title="Vérifier les mises à jour"
              >
                <CheckCircle className={`w-5 h-5 ${state === 'checking' ? 'animate-spin' : ''}`} />
                <span>{state === 'checking' ? 'Vérification...' : 'Vérifier'}</span>
              </button>

              {modsStatus === 'synced' || (state === 'checking' && modsStatus !== 'outdated') ? (
                <div className="shrink-0 flex items-center space-x-2 px-4 py-2 bg-green-900/20 text-green-400 border border-green-600/30 rounded-lg">
                  <CheckCircle className={`w-5 h-5 ${state === 'checking' ? 'animate-pulse' : ''}`} />
                  <span className="font-medium">{state === 'checking' ? 'Vérification...' : 'À jour'}</span>
                </div>
              ) : (
                <button
                  onClick={onDownload}
                  disabled={state === 'downloading' || state === 'checking'}
                  className="btn-success shrink-0"
                >
                  <Download className={`w-5 h-5 ${state === 'downloading' ? 'animate-bounce' : ''}`} />
                  <span>{state === 'downloading' ? 'Synchronisation...' : 'Synchroniser'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Progression */}
          {(progress > 0 || state === 'downloading' || fileName) && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-orange-200/90">Progression globale</span>
                <span className="text-white font-mono">{progress}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {fileName && (
                <div className="space-y-2 p-3 rounded bg-gray-800/50 border border-gray-700/50">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-300 truncate">{fileName}</span>
                    <span className="text-gray-200">{fileProgress}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-400 rounded-full transition-all duration-300"
                      style={{ width: `${fileProgress}%` }}
                    />
                  </div>
                  {eta && <div className="text-xs text-gray-400">Temps restant: {eta}</div>}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-orange-600/50 via-red-500/50 to-yellow-500/50 opacity-60" />
      </div>
    </div>
  )
}

// Composant Onglet Liens Utiles
function LinksTab() {
  // Configuration des couleurs par catégorie
  const categoryColors = {
    principal: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
    communaute: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
    communication: 'from-green-500/20 to-green-600/20 border-green-500/30',
    vote: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30',
    information: 'from-gray-500/20 to-gray-600/20 border-gray-500/30',
    support: 'from-red-500/20 to-red-600/20 border-red-500/30'
  }

  // Noms d'affichage des catégories
  const categoryLabels = {
    principal: 'Principal',
    communaute: 'Communauté',
    communication: 'Communication',
    vote: 'Vote',
    information: 'Information',
    support: 'Support'
  }

  // Récupérer les liens depuis la configuration
  const linkCategories = config.links || {}
  const availableCategories = Object.keys(linkCategories).filter(cat =>
    linkCategories[cat as keyof typeof linkCategories] &&
    linkCategories[cat as keyof typeof linkCategories].length > 0
  )

  const handleLinkClick = (url: string) => {
    window.ipcRenderer.invoke('open-url', url)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-orange-100 mb-2">🔗 Liens Utiles</h2>
        <p className="text-sm text-gray-400 max-w-xl mx-auto">
          Accès rapide à tous les services et ressources du serveur
        </p>
      </div>

      {/* Liens par catégorie */}
      {availableCategories.length > 0 ? availableCategories.map(categoryKey => {
        const categoryLinks = linkCategories[categoryKey as keyof typeof linkCategories] || []
        const categoryLabel = categoryLabels[categoryKey as keyof typeof categoryLabels] || categoryKey
        const categoryColor = categoryColors[categoryKey as keyof typeof categoryColors] || 'from-gray-500/20 to-gray-600/20 border-gray-500/30'

        return (
          <div key={categoryKey} className="card">
            <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center space-x-2">
              <ExternalLink className="w-4 h-4 text-orange-400" />
              <span>{categoryLabel}</span>
              <span className="text-xs bg-orange-900/30 text-orange-300 px-2 py-1 rounded-full">
                {categoryLinks.length}
              </span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categoryLinks.map((link: any, index: any) => (
                <div
                  key={index}
                  onClick={() => handleLinkClick(link.url)}
                  className={`link-card group cursor-pointer p-4 rounded-lg bg-gradient-to-br ${categoryColor} hover:scale-[1.02] transition-all duration-300`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {link.icon}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-gray-200 mb-1 group-hover:text-orange-200 transition-colors">
                        {link.title}
                      </h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {link.description}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      }) : (
        <div className="card text-center py-8">
          <ExternalLink className="w-16 h-16 mx-auto mb-4 opacity-50 text-gray-400" />
          <h4 className="text-lg font-medium mb-2 text-gray-300">Aucun lien configuré</h4>
          <p className="text-sm text-gray-400">
            Les liens utiles peuvent être configurés dans le fichier de configuration.
          </p>
        </div>
      )}

      {/* Info footer */}
      <div className="text-center pt-2 border-t border-orange-600/20">
        <p className="text-xs text-gray-500">
          💡 Cliquez sur un lien pour l'ouvrir dans votre navigateur par défaut
        </p>
      </div>
    </div>
  )
}

// Composant Onglet Paramètres
//@ts-ignore
function SettingsTab({ arma3Path, onLocate, onLaunch, state }: {
  arma3Path: string | null
  onLocate: () => void
  onLaunch: () => void
  state: LauncherState
}) {
  return (
    <div className="space-y-6">
      {/* Configuration Arma 3 */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-200 mb-4 flex items-center space-x-2">
          <Settings className="w-5 h-5 text-purple-400" />
          <span>Configuration</span>
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Chemin d'installation Arma 3</label>
            <div className="flex space-x-2">
              <div className="flex-1 p-3 bg-gray-800/50 rounded border border-gray-600/50 text-gray-300 text-sm">
                {arma3Path || 'Aucun chemin sélectionné'}
              </div>
              <button
                onClick={onLocate}
                disabled={state === 'locating'}
                className="btn-secondary"
              >
                <Folder className="w-5 h-5" />
                <span>{state === 'locating' ? 'Recherche...' : 'Parcourir'}</span>
              </button>
            </div>
          </div>
          <div className="pt-2 border-t border-gray-700/50">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={async () => {
                  try {
                    await window.ipcRenderer.invoke('install-tfar')
                  } catch (e) {
                    // no-op, le main enverra des toasts via messages
                  }
                }}
                className="btn-secondary"
                title="Installer le plugin TeamSpeak TFAR"
              >
                <Download className="w-5 h-5" />
                <span>Installer TFAR</span>
              </button>


            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Fonctions utilitaires pour les actualités
function getNewsTypeEmoji(type: string): string {
  const emojis: Record<string, string> = {
    info: '📢',
    update: '🔄',
    event: '🎉',
    warning: '⚠️',
    maintenance: '🔧'
  }
  return emojis[type] || '📢'
}

function getNewsTypeClass(type: string): string {
  const classes: Record<string, string> = {
    info: 'bg-blue-900/30 text-blue-400',
    update: 'bg-green-900/30 text-green-400',
    event: 'bg-purple-900/30 text-purple-400',
    warning: 'bg-orange-900/30 text-orange-400',
    maintenance: 'bg-red-900/30 text-red-400'
  }
  return classes[type] || 'bg-gray-900/30 text-gray-400'
}

function getNewsBorderColor(type: string): string {
  const colors: Record<string, string> = {
    info: 'border-blue-500',
    update: 'border-green-500',
    event: 'border-purple-500',
    warning: 'border-orange-500',
    maintenance: 'border-red-500'
  }
  return colors[type] || 'border-gray-500'
}

function formatDate(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor(diff / (1000 * 60))

  if (days > 0) return `Il y a ${days} jour${days > 1 ? 's' : ''}`
  if (hours > 0) return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`
  if (minutes > 0) return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`
  return 'À l\'instant'
}

export default App
