package id.sumi.app;

import android.net.Uri;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import com.getcapacitor.Bridge;
import com.getcapacitor.BridgeWebViewClient;
import java.io.IOException;
import java.util.Collections;
import java.util.Map;

/**
 * Next.js static export menyimpan setiap rute sebagai `<rute>/index.html`.
 * WebViewLocalServer bawaan Capacitor mengarahkan semua path tanpa ekstensi ke
 * `index.html` di akar, sehingga cold start atau reload pada rute bersarang
 * menampilkan halaman landing.
 *
 * Client ini hanya mengubah permintaan navigasi utama (bukan aset/RSC) ke
 * `<rute>/index.html` yang sesuai, sementara URL yang terlihat di WebView tetap
 * sama agar router Next.js membaca rute yang benar.
 */
public class StaticRouteWebViewClient extends BridgeWebViewClient {

    private static final String DEFAULT_INDEX = "/index.html";

    private final Bridge bridge;

    public StaticRouteWebViewClient(Bridge bridge) {
        super(bridge);
        this.bridge = bridge;
    }

    @Override
    public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
        if (request.isForMainFrame()) {
            WebResourceRequest mapped = mapToIndex(request);
            if (mapped != null) {
                return super.shouldInterceptRequest(view, mapped);
            }
        }
        return super.shouldInterceptRequest(view, request);
    }

    /**
     * @return permintaan dengan URL diarahkan ke index.html rute, atau null jika
     *         rute tidak memerlukan pemetaan.
     */
    private WebResourceRequest mapToIndex(WebResourceRequest request) {
        Uri url = request.getUrl();
        String path = url.getPath();
        if (path == null || path.isEmpty() || DEFAULT_INDEX.equals(path)) {
            return null;
        }

        String lastSegment = url.getLastPathSegment();
        if (lastSegment != null && lastSegment.contains(".")) {
            return null;
        }

        String candidate = path.endsWith("/") ? path + "index.html" : path + "/index.html";
        if (!assetExists(candidate)) {
            return null;
        }

        Uri mappedUrl = url.buildUpon().path(candidate).build();
        return new MappedRequest(request, mappedUrl);
    }

    private boolean assetExists(String path) {
        try (java.io.InputStream stream = bridge
            .getContext()
            .getAssets()
            .open(bridge.getLocalServer().getBasePath() + path)) {
            return true;
        } catch (IOException error) {
            return false;
        }
    }

    private static final class MappedRequest implements WebResourceRequest {

        private final WebResourceRequest original;
        private final Uri url;

        MappedRequest(WebResourceRequest original, Uri url) {
            this.original = original;
            this.url = url;
        }

        @Override
        public Uri getUrl() {
            return url;
        }

        @Override
        public boolean isForMainFrame() {
            return original.isForMainFrame();
        }

        @Override
        public boolean isRedirect() {
            return original.isRedirect();
        }

        @Override
        public boolean hasGesture() {
            return original.hasGesture();
        }

        @Override
        public String getMethod() {
            return original.getMethod();
        }

        @Override
        public Map<String, String> getRequestHeaders() {
            Map<String, String> headers = original.getRequestHeaders();
            return headers == null ? Collections.emptyMap() : headers;
        }
    }
}
