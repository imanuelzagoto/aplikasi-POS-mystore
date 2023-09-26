<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>{{ config('app.name') }} | @yield('title')</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.7 -->
    <link rel="stylesheet" href="{{ asset('helper-master/bower_components/bootstrap/dist/css/bootstrap.min.css') }}">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="{{ asset('helper-master/bower_components/font-awesome/css/font-awesome.min.css') }}">
    <!-- Ionicons -->
    <link rel="stylesheet" href="{{ asset('helper-master/bower_components/Ionicons/css/ionicons.min.css') }}">
    <!-- Theme style -->
    <link rel="stylesheet" href="{{ asset('helper-master/dist/css/AdminLTE.min.css') }}">
    <link rel="stylesheet" href="{{ asset('helper-master/dist/css/skins/_all-skins.min.css') }}">
    <!-- Morris chart -->
    <link rel="stylesheet" href="{{ asset('helper-master/bower_components/morris.js/morris.css') }}">
    <!-- jvectormap -->
    <link rel="stylesheet" href="{{ asset('bower_components/jvectormap/jquery-jvectormap.css') }}">
    <!-- Date Picker -->
    <link rel="stylesheet"
        href="{{ asset('helper-master/bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css') }}">
    <!-- Daterange picker -->
    <link rel="stylesheet"
        href="{{ asset('helper-master/bower_components/bootstrap-daterangepicker/daterangepicker.css') }}">
    <!-- bootstrap wysihtml5 - text editor -->
    <link rel="stylesheet" href="{{ asset('plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css') }}">

    <!-- Google Font -->
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
</head>

<body class="hold-transition skin-blue-light sidebar-mini">
    <div class="wrapper">
        {{-- Header --}}
        @includeIf('layouts.header')
        {{-- end header --}}
        {{-- sidebar --}}
        @includeIf('layouts.sidebar')
        {{-- end sidebar --}}
        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <section class="content-header">
                <h1>
                    @yield('title')
                </h1>
                <ol class="breadcrumb">
                    @section('breadcrum')
                        <li style="color: rgb(90, 92, 90); font-weight: bold; font-size: 13px">
                            <i class="fa fa-clock-o"></i>&nbsp;
                            <?php
                            date_default_timezone_set('Asia/Jakarta'); // Zona Waktu indonesia
                            echo date('H : i : s a'); // menampilkan jam sekarang
                            ?>
                        </li>
                    @show
                </ol>
            </section>
            <!-- Main content -->
            <section class="content">
                @yield('content')
            </section>
            <!-- /.content -->
        </div>
        <!-- /.content-wrapper -->
        {{-- footer --}}
        @includeIf('layouts.footer')
        {{-- end footer --}}
    </div>
    <!-- ./wrapper -->

    {{-- script --}}
    @includeIf('helperScript.script')
    {{-- end script --}}
</body>

</html>
