---
layout: post
title: bootstrap black dashboard
date: 2019-09-10
tags: test
---

[공식홈페이지](https://www.creative-tim.com/product/black-dashboard)

<!-- CSS Files -->
<link href="https://demos.creative-tim.com/black-dashboard/assets/css/black-dashboard.min.css?v=1.0.0" rel="stylesheet" />

<!--     Fonts and icons     -->
<link href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,600,700,800" rel="stylesheet">
<link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">

<div class="wrapper ">
  <div class="sidebar" data-color="purple" data-background-color="white">
    <!--
      Tip 1: You can change the color of the sidebar using: data-color="purple | azure | green | orange | danger"

      Tip 2: you can also add an image using data-image tag
  -->
    <div class="logo">
      <a href="http://www.creative-tim.com" class="simple-text logo-mini">
        CT
      </a>

      <a href="http://www.creative-tim.com" class="simple-text logo-normal">
       Creative Tim
      </a>
    </div>

    <div class="sidebar-wrapper">
      <ul class="nav">
        <li class="nav-item active  ">
            <a class="nav-link" href="#0">
                <i class="tim-icons icon-chart-pie-36"></i>
                <p>Dashboard</p>
            </a>
        </li>

         <!-- your sidebar here -->
      </ul>
    </div>
  </div>
  <div class="main-panel">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
      <div class="container-fluid">
        <div class="navbar-wrapper">

          <a class="navbar-brand" href="#pablo">Dashboard</a>
        </div>

        <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
          <span class="sr-only">Toggle navigation</span>
          <span class="navbar-toggler-icon icon-bar"></span>
          <span class="navbar-toggler-icon icon-bar"></span>
          <span class="navbar-toggler-icon icon-bar"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-end">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#pablo">
                <i class="tim-icons icon-bell-55"></i>  Notifications
              </a>
            </li>
             <!-- your navbar here -->
          </ul>
        </div>
      </div>
    </nav>
    <!-- End Navbar -->
    <div class="content">
      <div class="container-fluid">
         <!-- your content here -->
      </div>
    </div>
    <footer class="footer">
      <div class="container-fluid">
        <nav class="float-left">
          <ul>
              <li>
                  <a href="https://www.creative-tim.com">
                      Creative Tim
                  </a>
              </li>
          </ul>
        </nav>
        <div class="copyright float-right">
            &copy;
            <script>
                document.write(new Date().getFullYear())
            </script>, made with <i class="tim-icons icon-heart-2"></i> by
            <a href="https://www.creative-tim.com" target="_blank">Creative Tim</a> for a better web.
        </div>

         <!-- your footer here -->
      </div>
    </footer>
  </div>
</div>

<!--   Core JS Files   -->
<script src="https://demos.creative-tim.com/black-dashboard/assets/js/core/jquery.min.js" type="text/javascript"></script>
<script src="https://demos.creative-tim.com/black-dashboard/assets/js/core/popper.min.js" type="text/javascript"></script>
<script src="https://demos.creative-tim.com/black-dashboard/assets/js/core/bootstrap.min.js" type="text/javascript"></script>
<script src="https://demos.creative-tim.com/black-dashboard/assets/js/plugins/perfect-scrollbar.jquery.min.js"></script>
<!--  Google Maps Plugin    -->
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script>
<!-- Chartist JS -->
<script src="https://demos.creative-tim.com/black-dashboard/assets/js/plugins/chartjs.min.js"></script>
<!--  Notifications Plugin    -->
<script src="https://demos.creative-tim.com/black-dashboard/assets/js/plugins/bootstrap-notify.js"></script>
<!-- Control Center for Material Dashboard: parallax effects, scripts for the example pages etc -->
<script src="https://demos.creative-tim.com/black-dashboard/assets/js/black-dashboard.js?v=1.0.0" type="text/javascript"></script>
