import config from "../playwright.config.js";

export function getUrl() {
	const serverConfig = config.webServer;
	if (Array.isArray(serverConfig)) {
		if (serverConfig[0].url) return serverConfig[0].url;
		throw new Error("Could not locate server url");
	} else if (serverConfig?.url) {
		return serverConfig.url;
	} else {
		throw new Error("Could not locate server url");
	}
}
