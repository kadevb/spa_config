export const dataOptions = [
  {
    name: 'CIS20 Main Categories',
    source: './lookups/spa_mainCategories.csv',
    rowKey: ['categoryId', 'name'],
  },
  {
    name: 'CIS20 Controls',
    source: './lookups/spa_cis20controls.csv',
    rowKey: ['controlId', 'name'],
  },
  {
    name: 'CIS20 Sub-Controls',
    source: './lookups/spa_cis20subControls.csv',
    rowKey: ['subControlId', 'name'],
  },
  {
    name: 'CIS20 Metrics',
    source: './lookups/spa_cis20metrics.csv',
    rowKey: ['metricId', 'name'],
  },
  {
    name: 'CIS20 Sub-Metrics',
    source: './lookups/spa_cis20subMetrics.csv',
    rowKey: ['subMetricId', 'name'],
  },
  {
    name: 'CIS20 DHCP Servers',
    source: './lookups/spa_cis20dhcpServers.csv',
    rowKey: ['hostname', 'ipAddress'],
  },
  {
    name: 'CIS20 Monitored Authorization Systems',
    source: './lookups/spa_cis20monitoredAuthorizationSystems.csv',
    rowKey: ['Monitored Authorization Systems', 'All Authorization Systems'],
  },
  {
    name: 'CIS20 Vulnerability Scanners',
    source: './lookups/spa_cis20vulnerabilityScanners.csv',
    rowKey: ['VS_Tool', 'index'],
  },
]

export const calcOptions = [
  'Automatic',
  'Not Implemented',
  'Partially Implemented',
  'Fully Implemented on Some systems',
  'Fully Implemented on Most systems',
  'Fully Implemented on All systems',
  'Not yet monitored',
]
