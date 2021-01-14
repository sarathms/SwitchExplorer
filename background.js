async function openMyPage() {
  tabInfo = await browser.tabs.query({
    currentWindow: true,
    active: true
  })
  const u = new URL(tabInfo[0].url)
  if (u.hostname === 'localhost') {
    toExplorer(u)
  } else {
    toLocal(u)
  }
}

const toLocal = (u) => {
  u.protocol = 'http'
  u.host = 'localhost'
  u.port = '3100'
  goto(u.href)
}

const toExplorer = (u) => {
  u.protocol = 'https'
  u.host = 'explorer.ooni.org'
  u.port = ''
  goto(u.href)
}

const goto = (url) => {
  browser.tabs.create({ url })
}

browser.browserAction.onClicked.addListener(openMyPage);

