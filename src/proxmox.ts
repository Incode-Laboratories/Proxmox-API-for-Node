import querystring from "querystring";
import { Callback, ProxmoxClientConfig, Token } from "./types";
import ApiInteractionBuilder from "./apiInteractions";

export { ProxmoxClientConfig };

export type Proxmox = ReturnType<typeof proxmox>;

export default function proxmox(config: ProxmoxClientConfig) {
  const apiURL = `${config.endpoint.protocol}//${config.endpoint.hostname}:${config.endpoint.port}${config.endpoint.pathname}api2/json`;

  const token = config.api

  const api = new ApiInteractionBuilder(apiURL, token);

  return {
    getClusterStatus: function (callback: Callback) {
      const data = {};
      api.get('/cluster/status', data, callback);
    },
    getClusterBackupSchedule: function (callback: Callback) {
      const data = {};
      api.get('/cluster/backup', data, callback);
    },
    getNodeNetworks: function (node: string, callback: Callback) {
      const data = {};
      const url = '/nodes/' + node + '/network';
      api.get(url, data, callback);
    },
    getNodeInterface: function (node: string, netInterface: string, callback: Callback) {
      const data = {};
      const url = '/nodes/' + node + '/network/' + netInterface;
      api.get(url, data, callback);
    },
    getNodeContainerIndex: function (node: string, callback: Callback) {
      const data = {};
      const url = '/nodes/' + node + '/openvz/';
      api.get(url, data, callback);
    },
    getNodeVirtualIndex: function (node: string, callback: Callback) {
      const data = {};
      const url = '/nodes/' + node + '/qemu';
      api.get(url, data, callback);
    },
    getNodeServiceState: function (node: string, service: string, callback: Callback) {
      const data = {};
      const url = '/nodes/' + node + '/services/' + service + '/state';
      api.get(url, data, callback);
    },
    getNodeStorage: function (node: string, callback: Callback) {
      const data = {};
      const url = '/nodes/' + node + '/storage';
      api.get(url, data, callback);
    },
    getNodeFinishedTasks: function (node: string, callback: Callback) {
      const data = {};
      const url = '/nodes/' + node + '/tasks';
      api.get(url, data, callback);
    },
    getNodeDNS: function (node: string, callback: Callback) {
      const data = {};
      const url = '/nodes/' + node + '/dns';
      api.get(url, data, callback);
    },
    getNodeSyslog: function (node: string, callback: Callback) {
      const data = {};
      const url = '/nodes/' + node + '/syslog';
      api.get(url, data, callback);
    },
    getNodeRRD: function (node: string, callback: Callback) {
      const data = {};
      const url = '/nodes/' + node + '/rrd';
      api.get(url, data, callback);
    },
    getNodeRRDData: function (node: string, callback: Callback) {
      const data = {};
      const url = '/nodes/' + node + '/rrddata';
      api.get(url, data, callback);
    },
    getNodeBeans: function (node: string, callback: Callback) {
      const data = {};
      const url = '/nodes/' + node + '/ubfailcnt';
      api.get(url, data, callback);
    },
    getNodeTaskByUPID: function (node: string, upid: string, callback: Callback) {
      const data = {};
      const url = '/nodes/' + node + '/tasks/' + upid;
      api.get(url, data, callback);
    },
    getNodeTaskLogByUPID: function (node: string, upid: string, callback: Callback) {
      const data = {};
      const url = '/nodes/' + node + '/tasks/' + upid + '/log';
      api.get(url, data, callback);
    },
    getNodeTaskStatusByUPID: function (node: string, upid: string, callback: Callback) {
      const data = {};
      const url = '/nodes/' + node + '/tasks/' + upid + '/status';
      api.get(url, data, callback);
    },
    getNodeScanMethods: function (node: string, callback: Callback) {
      const data = {};
      const url = '/nodes/' + node + '/scan';
      api.get(url, data, callback);
    },
    getRemoteiSCSI: function (node: string, callback: Callback) {
      const data = {};
      const url = '/nodes/' + node + '/scan/iscsi';
      api.get(url, data, callback);
    },
    getNodeLVMGroups: function (node: string, callback: Callback) {
      const data = {};
      const url = '/nodes/' + node + '/scan/lvm';
      api.get(url, data, callback);
    },
    getRemoteNFS: function (node: string, callback: Callback) {
      const data = {};
      const url = '/nodes/' + node + '/scan/nfs';
      api.get(url, data, callback);
    },
    getNodeUSB: function (node: string, callback: Callback) {
      const data = {};
      const url = '/nodes/' + node + '/scan/usb';
      api.get(url, data, callback)
    },
    getStorageVolumeData: function (node: string, storage: string, volume: string, callback: Callback) {
      const data = {};
      const url = '/nodes/' + node + '/storage/' + storage + '/content/' + volume;
      api.get(url, data, callback);
    },
    getStorageConfig: function (storage: string, callback: Callback) {
      const data = {};
      const url = '/storage/' + storage;
      api.get(url, data, callback);
    },
    getNodeStorageContent: function (node: string, storage: string, callback: Callback) {
      const data = {};
      const url = '/nodes/' + node + '/storage/' + storage + '/content';
      api.get(url, data, callback);
    },
    getNodeStorageRRD: function (node: string, storage: string, callback: Callback) {
      const data = {};
      const url = '/nodes/' + node + '/storage/' + storage + '/rrd';
      api.get(url, data, callback);
    },
    getNodeStorageRRDData: function (node: string, storage: string, callback: Callback) {
      const data = {};
      const url = '/nodes/' + node + '/storage/' + storage + '/rrddata';
      api.get(url, data, callback);
    },
    //openvz functions
    openvz: {
      createOpenvzContainer: function (node: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
        const url = '/nodes/' + node + '/openvz'
        api.post(url, data, callback);
      },
      mountOpenvzPrivate: function (node: string, vmid: string, callback: Callback) {
        const data = {};
        const url = '/nodes/' + node + '/openvz/' + vmid + '/status/mount';
        api.post(url, data, callback);
      },
      shutdownOpenvzContainer: function (node: string, vmid: string, callback: Callback) {
        const data = {};
        const url = '/nodes/' + node + '/openvz/' + vmid + '/status/shutdown';
        api.post(url, data, callback);
      },
      startOpenvzContainer: function (node: string, vmid: string, callback: Callback) {
        const data = {};
        const url = '/nodes/' + node + '/openvz/' + vmid + '/status/start';
        api.post(url, data, callback);
      },
      stopOpenvzContainer: function (node: string, vmid: string, callback: Callback) {
        const data = {};
        const url = '/nodes/' + node + '/openvz/' + vmid + '/status/stop';
        api.post(url, data, callback);
      },
      unmountOpenvzContainer: function (node: string, vmid: string, callback: Callback) {
        const data = {};
        const url = '/nodes/' + node + '/openvz/' + vmid + '/status/unmount';
        api.post(url, data, callback);
      },
      migrateOpenvzContainer: function (node: string, vmid: string, target: string, callback: Callback) {
        const data = { 'target': target };
        const url = '/nodes/' + node + '/openvz/' + vmid + '/migrate';
        api.post(url, data, callback);
      },
      getContainerIndex: function (node: string, vmid: string, callback: Callback) {
        const data = {};
        const url = '/nodes/' + node + '/openvz/' + vmid;
        api.get(url, data, callback);
      },
      getContainerStatus: function (node: string, vmid: string, callback: Callback) {
        const data = {};
        const url = '/nodes/' + node + '/openvz/' + vmid + '/status/current';
        api.get(url, data, callback);
      },
      getContainerBeans: function (node: string, vmid: string, callback: Callback) {
        const data = {};
        const url = '/nodes/' + node + '/openvz/' + vmid + '/status/ubc';
        api.get(url, data, callback);
      },
      getContainerConfig: function (node: string, vmid: string, callback: Callback) {
        const data = {};
        const url = '/nodes/' + node + '/openvz/' + vmid + '/config';
        api.get(url, data, callback);
      },
      getContainerInitLog: function (node: string, vmid: string, callback: Callback) {
        const data = {};
        const url = '/nodes/' + node + '/openvz/' + vmid + '/initlog';
        api.get(url, data, callback);
      },
      getContainerRRD: function (node: string, vmid: string, callback: Callback) {
        const data = {};
        const url = '/nodes/' + node + '/openvz/' + vmid + '/rrd';
        api.get(url, data, callback);
      },
      getContainerRRDData: function (node: string, vmid: string, callback: Callback) {
        const data = {};
        const url = '/nodes/' + node + '/openvz/' + vmid + '/rrddata';
        api.get(url, data, callback);
      },
      deleteOpenvzContainer: function (node: string, vmid: string, callback: Callback) {
        const data = {};
        const url = '/nodes/' + node + '/openvz/' + vmid;
        api.del(url, data, callback);
      },
      setOpenvzContainerOptions: function (node: string, vmid: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
        const url = '/nodes/' + node + '/openvz/' + vmid + '/config';
        api.put(url, data, callback);
      }
    },

    deleteNodeNetworkConfig: function (node: string, callback: Callback) {
      const data = {};
      const url = '/nodes/' + node + '/network';
      api.del(url, data, callback);
    },
    deleteNodeInterface: function (node: string, netInterface: string, callback: Callback) {
      const data = {};
      const url = '/nodes/' + node + '/network/' + netInterface;
      api.del(url, data, callback);
    },
    deletePool: function (poolid: string, callback: Callback) {
      const data = {};
      const url = '/pools/' + poolid;
      api.del(url, data, callback);
    },
    setNodeDNSDomain: function (node: string, domain: string, callback: Callback) {
      const data = { 'search': domain };
      const url = '/nodes/' + node + '/dns';
      api.put(url, data, callback);
    },
    setNodeSubscriptionKey: function (node: string, key: string, callback: Callback) {
      const data = { 'key': key };
      const url = '/nodes/' + node + '/subscription';
      api.put(url, data, callback);
    },
    setNodeTimeZone: function (node: string, timezone: string, callback: Callback) {
      const data = { 'timezone': timezone };
      const url = '/nodes/' + node + '/time';
      api.put(url, data, callback);
    },
    setPoolData: function (poolid: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
      const url = '/pools/' + poolid;
      api.put(url, data, callback);
    },
    updateStorageConfiguration: function (storageid: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
      const url = '/storage/' + storageid;
      api.put(url, data, callback);
    },
    //self added functions
    getNodes: function (callback: Callback) {
      const data = {};
      const url = '/nodes/';
      api.get(url, data, callback);
    },
    getStorage: function (callback: Callback) {
      const data = {};
      const url = '/storage/';
      api.get(url, data, callback);
    },
    getQemu: function (node: string, callback: Callback) {
      const data = {};
      const url = '/nodes/' + node + '/qemu';
      api.get(url, data, callback);
    },
    createQemu: function (node: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
      const url = '/nodes/' + node + '/qemu';
      api.post(url, data, callback);
    },
    //vm functions
    qemu: {
      getStatus: function (node: string, qemu: string, callback: Callback) {
        const data = {};
        const url = '/nodes/' + node + '/qemu/' + qemu + '/status/';
        api.get(url, data, callback);
      },
      get: function (node: string, qemu: string, callback: Callback) {
        const data = {};
        const url = '/nodes/' + node + '/qemu/' + qemu;
        api.get(url, data, callback);
      },
      del: function (node: string, qemu: string, callback: Callback) {
        const data = {};
        const url = '/nodes/' + node + '/qemu/' + qemu;
        api.del(url, data, callback);
      },
      getStatusCurrent: function (node: string, qemu: string, callback: Callback) {
        const data = {};
        const url = '/nodes/' + node + '/qemu/' + qemu + '/status/current'
        api.get(url, data, callback);
      },
      start: function (node: string, qemu: string, callback: Callback) {
        const data = {};
        const url = '/nodes/' + node + '/qemu/' + qemu + '/status/start';
        api.post(url, data, callback);
      },
      stop: function (node: string, qemu: string, callback: Callback) {
        const data = {};
        const url = '/nodes/' + node + '/qemu/' + qemu + '/status/stop';
        api.post(url, data, callback);
      },
      reset: function (node: string, qemu: string, callback: Callback) {
        const data = {};
        const url = '/nodes/' + node + '/qemu/' + qemu + '/status/reset';
        api.post(url, data, callback);
      },
      shutdown: function (node: string, qemu: string, callback: Callback) {
        const data = {};
        const url = '/nodes/' + node + '/qemu/' + qemu + '/status/shutdown';
        api.post(url, data, callback);
      },
      suspend: function (node: string, qemu: string, callback: Callback) {
        const data = {};
        const url = '/nodes/' + node + '/qemu/' + qemu + '/status/suspend';
        api.post(url, data, callback);
      },
      resume: function (node: string, qemu: string, callback: Callback) {
        const data = {};
        const url = '/nodes/' + node + '/qemu/' + qemu + '/status/resume';
        api.post(url, data, callback);
      },
      //snapshot functions
      snapshot: {
        list: function (node: string, qemu: string, callback: Callback) {
          const data = {};
          const url = '/nodes/' + node + '/qemu/' + qemu + '/snapshot';
          api.get(url, data, callback);
        },
        get: function (node: string, qemu: string, snapname: string, callback: Callback) {
          const data = {};
          const url = '/nodes/' + node + '/qemu/' + qemu + '/snapshot/' + snapname;
          api.get(url, data, callback);
        },
        getConfig: function (node: string, qemu: string, snapname: string, callback: Callback) {
          const data = {};
          const url = '/nodes/' + node + '/qemu/' + qemu + '/snapshot/' + snapname + '/config';
          api.get(url, data, callback);
        },
        putConfig: function (node: string, qemu: string, snapname: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
          const url = '/nodes/' + node + '/qemu/' + qemu + '/snapshot/' + snapname + '/config';
          api.put(url, data, callback);
        },
        rollback: function (node: string, qemu: string, snapname: string, callback: Callback) {
          const data = {};
          const url = '/nodes/' + node + '/qemu/' + qemu + '/snapshot/' + snapname + '/rollback';
          api.post(url, data, callback);
        },
        delete: function (node: string, qemu: string, snapname: string, callback: Callback) {
          const data = {};
          const url = '/nodes/' + node + '/qemu/' + qemu + '/snapshot/' + snapname;
          api.del(url, data, callback);
        },
        make: function (node: string, qemu: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
          const url = '/nodes/' + node + '/qemu/' + qemu + '/snapshot';
          api.post(url, data, callback);
        },
      },
      rrd: function (node: string, qemu: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
        const url = '/nodes/' + node + '/qemu/' + qemu + '/rrd';
        api.get(url, data, callback);
      },
      rrdData: function (node: string, qemu: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
        const url = '/nodes/' + node + '/qemu/' + qemu + '/rrddata';
        api.get(url, data, callback);
      },
      getConfig: function (node: string, qemu: string, callback: Callback) {
        const data = {};
        const url = '/nodes/' + node + '/qemu/' + qemu + '/config';
        api.get(url, data, callback);
      },
      updateConfig: function (node: string, qemu: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
        const url = '/nodes/' + node + '/qemu/' + qemu + '/config';
        api.put(url, data, callback);
      },
      setConfig: function (node: string, qemu: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
        const url = '/nodes/' + node + '/qemu/' + qemu + '/config';
        api.post(url, data, callback);
      },
      pending: function (node: string, qemu: string, callback: Callback) {
        const data = {};
        const url = '/nodes/' + node + '/qemu/' + qemu + '/pending';
        api.get(url, data, callback);
      },
      unlink: function (node: string, qemu: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
        const url = '/nodes/' + node + '/qemu/' + qemu + '/unlink';
        api.put(url, data, callback);
      },
      vncproxy: function (node: string, qemu: string, callback: Callback) {
        const data = {};
        const url = '/nodes/' + node + '/qemu/' + qemu + '/vncproxy';
        api.post(url, data, callback);
      },
      vncwebsocket: function (node: string, qemu: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
        const url = '/nodes/' + node + '/qemu/' + qemu + '/vncwebsocket';
        api.get(url, data, callback);
      },
      spiceproxy: function (node: string, qemu: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
        const url = '/nodes/' + node + '/qemu/' + qemu + '/spiceproxy';
        api.post(url, data, callback);
      },
      sendkey: function (node: string, qemu: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
        const url = '/nodes/' + node + '/qemu/' + qemu + '/sendkey';
        api.put(url, data, callback);
      },
      feature: function (node: string, qemu: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
        const url = '/nodes/' + node + '/qemu/' + qemu + '/feature';
        api.get(url, data, callback);
      },
      clone: function (node: string, qemu: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
        const url = '/nodes/' + node + '/qemu/' + qemu + '/clone';
        api.post(url, data, callback);
      },
      moveDisk: function (node: string, qemu: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
        const url = '/nodes/' + node + '/qemu/' + qemu + '/move_disk';
        api.post(url, data, callback);
      },
      migrate: function (node: string, qemu: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
        const url = '/nodes/' + node + '/qemu/' + qemu + '/migrate';
        api.post(url, data, callback);
      },
      monitor: function (node: string, qemu: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
        const url = '/nodes/' + node + '/qemu/' + qemu + '/monitor';
        api.post(url, data, callback);
      },
      resize: function (node: string, qemu: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
        const url = '/nodes/' + node + '/qemu/' + qemu + '/resize';
        api.put(url, data, callback);
      },
      template: function (node: string, qemu: string, callback: Callback) {
        const data = {};
        const url = '/nodes/' + node + '/qemu/' + qemu + '/template';
        api.post(url, data, callback);
      },
      //firewall functions
      firewall: {
        list: function (node: string, qemu: string, callback: Callback) {
          const data = {};
          const url = '/nodes/' + node + '/qemu/' + qemu + '/firewall';
          api.get(url, data, callback);
        },
        listRules: function (node: string, qemu: string, callback: Callback) {
          const data = {};
          const url = '/nodes/' + node + '/qemu/' + qemu + '/firewall/rules';
          api.get(url, data, callback);
        },
        createRule: function (node: string, qemu: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
          const url = '/nodes/' + node + '/qemu/' + qemu + '/firewall/rules';
          api.post(url, data, callback);
        },
        getRule: function (node: string, qemu: string, pos: string, callback: Callback) {
          const data = {};
          const url = '/nodes/' + node + '/qemu/' + qemu + '/firewall/rules/' + pos;
          api.get(url, data, callback);
        },
        updateRule: function (node: string, qemu: string, pos: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
          const url = '/nodes/' + node + '/qemu/' + qemu + '/firewall/rules/' + pos;
          api.put(url, data, callback);
        },
        deleteRule: function (node: string, qemu: string, pos: string, callback: Callback) {
          const data = {};
          const url = '/nodes/' + node + '/qemu/' + qemu + '/firewall/rules/' + pos;
          api.del(url, data, callback);
        },
        listAlias: function (node: string, qemu: string, callback: Callback) {
          const data = {};
          const url = '/nodes/' + node + '/qemu/' + qemu + '/firewall/aliases';
          api.get(url, data, callback);
        },
        createAlias: function (node: string, qemu: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
          const url = '/nodes/' + node + '/qemu/' + qemu + '/firewall/aliases';
          api.post(url, data, callback);
        },
        getAlias: function (node: string, qemu: string, name: string, callback: Callback) {
          const data = {};
          const url = '/nodes/' + node + '/qemu/' + qemu + '/firewall/aliases/' + name;
          api.get(url, data, callback);
        },
        updateAlias: function (node: string, qemu: string, name: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
          const url = '/nodes/' + node + '/qemu/' + qemu + '/firewall/aliases/' + name;
          api.put(url, data, callback);
        },
        deleteAlias: function (node: string, qemu: string, name: string, callback: Callback) {
          const data = {};
          const url = '/nodes/' + node + '/qemu/' + qemu + '/firewall/aliases/' + name;
          api.del(url, data, callback);
        },
        listIpset: function (node: string, qemu: string, callback: Callback) {
          const data = {};
          const url = '/nodes/' + node + '/qemu/' + qemu + '/firewall/ipset';
          api.get(url, data, callback);
        },
        createIpset: function (node: string, qemu: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
          const url = '/nodes/' + node + '/qemu/' + qemu + '/firewall/ipset';
          api.post(url, data, callback);
        },
        getIpsetContent: function (node: string, qemu: string, name: string, callback: Callback) {
          const data = {};
          const url = '/nodes/' + node + '/qemu/' + qemu + '/firewall/ipset/' + name;
          api.get(url, data, callback);
        },
        addIpToIpset: function (node: string, qemu: string, name: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
          const url = '/nodes/' + node + '/qemu/' + qemu + '/firewall/ipset/' + name;
          api.post(url, data, callback);
        },
        deleteIpset: function (node: string, qemu: string, name: string, callback: Callback) {
          const data = {};
          const url = '/nodes/' + node + '/qemu/' + qemu + '/firewall/ipset/' + name;
          api.del(url, data, callback);
        },
        getIpfromIpset: function (node: string, qemu: string, name: string, cidr: string, callback: Callback) {
          const data = {};
          const url = '/nodes/' + node + '/qemu/' + qemu + '/firewall/ipset/' + name + '/' + cidr;
          api.get(url, data, callback);
        },
        updateIpfromIpset: function (node: string, qemu: string, name: string, cidr: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
          const url = '/nodes/' + node + '/qemu/' + qemu + '/firewall/ipset/' + name + '/' + cidr;
          api.put(url, data, callback);
        },
        deleteIpfromIpset: function (node: string, qemu: string, name: string, cidr: string, callback: Callback) {
          const data = {};
          const url = '/nodes/' + node + '/qemu/' + qemu + '/firewall/ipset/' + name + '/' + cidr;
          api.del(url, data, callback);
        },
        getOptions: function (node: string, qemu: string, callback: Callback) {
          const data = {};
          const url = '/nodes/' + node + '/qemu/' + qemu + '/firewall/options';
          api.get(url, data, callback);
        },
        setOptions: function (node: string, qemu: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
          const url = '/nodes/' + node + '/qemu/' + qemu + '/firewall/options';
          api.put(url, data, callback);
        },
        getLog: function (node: string, qemu: string, callback: Callback) {
          const data = {};
          const url = '/nodes/' + node + '/qemu/' + qemu + '/firewall/log';
          api.get(url, data, callback);
        },
        getRefs: function (node: string, qemu: string, callback: Callback) {
          const data = {};
          const url = '/nodes/' + node + '/qemu/' + qemu + '/firewall/refs';
          api.get(url, data, callback);
        },
      },
    },
    network: {
      list: function (node: string, callback: Callback) {
        const data = {};
        const url = '/nodes/' + node + '/network';
        api.get(url, data, callback);
      },
      create: function (node: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
        const url = '/nodes/' + node + '/network';
        api.post(url, data, callback);
      },
      get: function (node: string, iface: string, callback: Callback) {
        const data = {};
        const url = '/nodes/' + node + '/network/' + iface;
        api.get(url, data, callback);
      },
      update: function (node: string, iface: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
        const url = '/nodes/' + node + '/network/' + iface;
        api.put(url, data, callback);
      },
      deleteIface: function (node: string, iface: string, callback: Callback) {
        const data = {};
        const url = '/nodes/' + node + '/network/' + iface;
        api.del(url, data, callback);
      },
      delete: function (node: string, callback: Callback) {
        const data = {};
        const url = '/nodes/' + node + '/network';
        api.del(url, data, callback);
      }
    },
    //access functions
    access: {
      listUsers: function (callback: Callback) {
        const data = {};
        const url = '/access/users';
        api.get(url, data, callback);
      },
      createUser: function (data: querystring.ParsedUrlQueryInput, callback: Callback) {
        const url = '/access/users';
        api.post(url, data, callback);
      },
      getUser: function (user: string, callback: Callback) {
        const data = {};
        const url = '/access/users/' + user;
        api.get(url, data, callback);
      },
      updateUser: function (user: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
        const url = '/access/users/' + user;
        api.put(url, data, callback);
      },
      deleteUser: function (user: string, callback: Callback) {
        const data = {};
        const url = '/access/users/' + user;
        api.del(url, data, callback);
      },
      listGroups: function (callback: Callback) {
        const data = {};
        const url = '/access/groups';
        api.get(url, data, callback);
      },
      createGroup: function (data: querystring.ParsedUrlQueryInput, callback: Callback) {
        const url = '/access/groups';
        api.post(url, data, callback);
      },
      getGroup: function (group: string, callback: Callback) {
        const data = {};
        const url = '/access/groups/' + group;
        api.get(url, data, callback);
      },
      updateGroup: function (group: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
        const url = '/access/groups/' + group;
        api.put(url, data, callback);
      },
      deleteGroup: function (group: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
        const url = '/access/groups/' + group;
        api.del(url, data, callback);
      },
      listRoles: function (callback: Callback) {
        const data = {};
        const url = '/access/roles';
        api.get(url, data, callback);
      },
      createRole: function (data: querystring.ParsedUrlQueryInput, callback: Callback) {
        const url = '/access/roles';
        api.post(url, data, callback);
      },
      getRole: function (role: string, callback: Callback) {
        const data = {};
        const url = '/access/roles/' + role;
        api.get(url, data, callback);
      },
      updateRole: function (role: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
        const url = '/access/roles/' + role;
        api.put(url, data, callback);
      },
      deleteRole: function (role: string, callback: Callback) {
        const data = {};
        const url = '/access/roles/' + role;
        api.del(url, data, callback);
      },
      listDomains: function (callback: Callback) {
        const data = {};
        const url = '/access/domains';
        api.get(url, data, callback);
      },
      createDomain: function (data: querystring.ParsedUrlQueryInput, callback: Callback) {
        const url = '/access/domains';
        api.post(url, data, callback);
      },
      getDomain: function (domain: string, callback: Callback) {
        const data = {};
        const url = '/access/domains/' + domain;
        api.get(url, data, callback);
      },
      updateDomain: function (domain: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
        const url = '/access/domains/' + domain;
        api.put(url, data, callback);
      },
      deleteDomain: function (domain: string, callback: Callback) {
        const data = {};
        const url = '/access/domains/' + domain;
        api.del(url, data, callback);
      },
      getAcl: function (callback: Callback) {
        const data = {};
        const url = '/access/acl';
        api.get(url, data, callback);
      },
      updateAcl: function (data: querystring.ParsedUrlQueryInput, callback: Callback) {
        const url = '/access/acl';
        api.put(url, data, callback);
      },
      getTicket: function (callback: Callback) {
        const data = {};
        const url = '/access/ticket';
        api.get(url, data, callback);
      },
      postTicket: function (data: querystring.ParsedUrlQueryInput, callback: Callback) {
        const url = '/access/ticket';
        api.post(url, data, callback);
      },
      password: function (data: querystring.ParsedUrlQueryInput, callback: Callback) {
        const url = '/access/password';
        api.put(url, data, callback);
      },
    },
    //pool functions
    pools: {
      list: function (callback: Callback) {
        const data = {};
        const url = '/pools';
        api.get(url, data, callback);
      },
      create: function (data: querystring.ParsedUrlQueryInput, callback: Callback) {
        const url = '/pools';
        api.post(url, data, callback);
      },
      get: function (pool: string, callback: Callback) {
        const data = {};
        const url = '/pools/' + pool;
        api.get(url, data, callback);
      },
      update: function (pool: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
        const url = '/pools/' + pool;
        api.put(url, data, callback);
      },
      delete: function (pool: string, callback: Callback) {
        const data = {};
        const url = '/pools/' + pool;
        api.del(url, data, callback);
      }
    },
    //storage functions
    storage: {
      list: function (callback: Callback) {
        const data = {};
        const url = '/storage';
        api.get(url, data, callback);
      },
      create: function (data: querystring.ParsedUrlQueryInput, callback: Callback) {
        const url = '/storage';
        api.post(url, data, callback);
      },
      get: function (storage: string, callback: Callback) {
        const data = {};
        const url = '/storage/' + storage;
        api.get(url, data, callback);
      },
      update: function (storage: string, data: querystring.ParsedUrlQueryInput, callback: Callback) {
        const url = '/storage/' + storage;
        api.put(url, data, callback);
      },
      delete: function (storage: string, callback: Callback) {
        const data = {};
        const url = '/storage/' + storage;
        api.del(url, data, callback);
      },

    },
  }
}
