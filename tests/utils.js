import config from "../playwright.config.js";

export function getUrl() {
	const serverConfig = config.webServer;
	if (!serverConfig) {
		throw new Error("Could not locate server url");
	} else if (Array.isArray(serverConfig)) {
		return serverConfig[0].url;
	} else {
		return serverConfig.url;
	}
}
