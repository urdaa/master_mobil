package io.ionic.starter;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.text.Html;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;



public class MainActivity extends BridgeActivity {

  final int ACCESS_BACKGROUND_REQUEST_CODE = 12345;

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here

      //Asks specifically for BACKGROUND_LOCATION permission and show alert if user chooses not to give it
      if (ContextCompat.checkSelfPermission(getApplicationContext(), Manifest.permission.ACCESS_BACKGROUND_LOCATION) != PackageManager.PERMISSION_GRANTED) {
        ActivityCompat.requestPermissions(MainActivity.this, new String[]{Manifest.permission.ACCESS_BACKGROUND_LOCATION}, ACCESS_BACKGROUND_REQUEST_CODE );
      }
    }});
  }

  @Override
  public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults)
  {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults);

    if (requestCode == ACCESS_BACKGROUND_REQUEST_CODE ) {

      // Checking whether user granted the permission or not.
      if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
        // Showing the toast message
        /*Toast.makeText(MainActivity.this,
                "Sufficient permissions granted",
                Toast.LENGTH_LONG)
                .show();*/
      }
      else {
        Toast.makeText(MainActivity.this,
                Html.fromHtml("<b>WARNING</b><br/>App needs location permission set to 'ALLOW ALL THE TIME' to work properly."),
                Toast.LENGTH_LONG).show();
      }
    }
  }
}
