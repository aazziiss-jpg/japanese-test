package id.sumi.app;

import android.os.Bundle;
import androidx.activity.EdgeToEdge;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // Wajib untuk plugin SystemBars: menyiapkan edge-to-edge di semua
        // versi Android agar inset aman (termasuk navigasi 3 tombol) konsisten.
        EdgeToEdge.enable(this);
        super.onCreate(savedInstanceState);
    }

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
