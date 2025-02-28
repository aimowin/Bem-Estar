package log.dia

import android.app.Activity
import android.os.Bundle
import android.webkit.WebView

class MainActivity : Activity() {
    override fun onCreate(bundle: Bundle?) {
        super.onCreate(bundle)
        val frame = WebView(this)
        frame.settings.javaScriptEnabled = true
        frame.settings.domStorageEnabled = true
        frame.loadUrl("file:///android_res/raw/index.html")
        setContentView(frame)
    }
}
