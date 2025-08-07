# THIS FILE IS AUTO-GENERATED. DO NOT MODIFY!!

# Copyright 2020-2023 Tauri Programme within The Commons Conservancy
# SPDX-License-Identifier: Apache-2.0
# SPDX-License-Identifier: MIT

-keep class tavern.ose.* {
  native <methods>;
}

-keep class tavern.ose.WryActivity {
  public <init>(...);

  void setWebView(tavern.ose.RustWebView);
  java.lang.Class getAppClass(...);
  java.lang.String getVersion();
}

-keep class tavern.ose.Ipc {
  public <init>(...);

  @android.webkit.JavascriptInterface public <methods>;
}

-keep class tavern.ose.RustWebView {
  public <init>(...);

  void loadUrlMainThread(...);
  void loadHTMLMainThread(...);
  void evalScript(...);
}

-keep class tavern.ose.RustWebChromeClient,tavern.ose.RustWebViewClient {
  public <init>(...);
}
