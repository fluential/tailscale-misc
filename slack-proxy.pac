function FindProxyForURL(url, host) {

    //-------------------------------------------------------------------------
    // Configuration: Proxy Server Details
    //-------------------------------------------------------------------------
    var proxy_string = "PROXY 100.77.235.108:8888";

    //-------------------------------------------------------------------------
    // Rule 1: Slack Application Dependencies via Proxy
    //-------------------------------------------------------------------------
    // Applications require multiple domains for content, APIs, and real-time features.
    // We will check against a list of domains known to be used by Slack.

    // List of domains related to Slack services.
    var slackDomains = [
        "slack.com",        // Core application
        //"slack-edge.com",   // CDN for static assets
        //"slack-imgs.com",   // Image hosting CDN
        "slackb.com",       // Internal/utility domain
        "slackdns.com",     // DNS management for Slack services
        //"chime.aws"         // Backend for Slack Huddles and calls (Amazon Chime)
    ];

    for (var i = 0; i < slackDomains.length; i++) {
        // dnsDomainIs(host, "domain.com") matches "domain.com" and "*.domain.com".
        if (dnsDomainIs(host, slackDomains[i])) {
            return proxy_string;
        }
    }

    //-------------------------------------------------------------------------
    // Default Rule: All Other Traffic Direct
    //-------------------------------------------------------------------------
    return "DIRECT";
}
