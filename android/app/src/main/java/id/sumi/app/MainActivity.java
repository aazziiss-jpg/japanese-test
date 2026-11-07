package id.sumi.app;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    protected void load() {
        super.load();

        // Ganti client bawaan dengan yang bisa memetakan deep link statis
        // (/preview/learn/) ke index.html rute yang sesuai.
        if (bridge != null) {
            bridge.setWebViewClient(new StaticRouteWebViewClient(bridge));
        }
    }
}
