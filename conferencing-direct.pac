function FindProxyForURL(url, host) {
    // Default proxy server.
    // IMPORTANT: Replace "your_proxy_host:your_proxy_port" with your actual proxy server address and port.
    // For example: "PROXY proxy.mycompany.com:8080"
    var proxy = "PROXY 100.77.235.108:8888";

    // --- Direct Connection Rules ---
    // These rules will bypass the proxy for better performance on real-time services.

    // List of domains to connect to directly, bypassing the proxy.
    var directDomains = [
        ".turns.goog",          // Google Meet media traffic
        ".chime.aws",           // Slack media traffic (Huddles & Calls via Amazon Chime)
        "wss-primary.slack.com",// Slack real-time WebSocket signaling
        "wss-backup.slack.com", // Slack real-time WebSocket signaling
        "wss-mobile.slack.com"  // Slack real-time WebSocket signaling
    ];

    // Check if the host matches any domain in the directDomains list.
    // dnsDomainIs(host, ".domain.com") matches "domain.com" and "*.domain.com".
    for (var i = 0; i < directDomains.length; i++) {
        if (dnsDomainIs(host, directDomains[i])) {
            return "DIRECT";
        }
    }

    // --- IP Address Based Rules ---
    // These are fallback rules in case domain-based routing is not sufficient.
    // Note: It's generally better to rely on the domain rules above as IPs can change.
    var resolved_ip = dnsResolve(host);

    if (resolved_ip) {
        // Google Meet IP Ranges
        if (isInNet(resolved_ip, "74.125.250.0", "255.255.255.0") ||
            isInNet(resolved_ip, "142.250.82.0", "255.255.255.0")) {
            return "DIRECT";
        }

        // Slack (Amazon Chime) IP Range
        if (isInNet(resolved_ip, "99.77.128.0", "255.255.192.0")) { // Corresponds to 99.77.128.0/18
            return "DIRECT";
        }
    }


    // --- Default Rule ---
    // For all other traffic, use the proxy.
    return proxy;
}


