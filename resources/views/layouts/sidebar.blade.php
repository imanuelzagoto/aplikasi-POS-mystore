<aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
        <!-- Sidebar user panel -->
        <div class="user-panel">
            <div class="pull-left image">
                <img src="{{ asset('helper-master/dist/img/user2-160x160.jpg') }}" class="img-circle" alt="User Image">
            </div>
            <div class="pull-left info">
                <p>Alexander Pierce</p>
                <a href="#">
                    <i class="fa fa-circle text-success"></i>
                    Online</a>
            </div>
        </div>
        <!-- sidebar menu-->
        <ul class="sidebar-menu" data-widget="tree">
            <li>
                <a href="{{ route('dashboard') }}">
                    <i class="fa fa-dashcube"></i>
                    <span>Dasbboard</span>
                </a>
            </li>
            <li class="header">MASTER</li>
            <li>
                <a href="{{ route('category.index') }}">
                    <i class="fa fa-cube"></i>
                    <span>Category</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fa fa-cubes"></i>
                    <span>Product</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fa fa-id-card"></i>
                    <span>Member</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fa fa-truck"></i>
                    <span>Supplier</span>
                </a>
            </li>
            <li class="header">Transactions</li>
            <li>
                <a href="#">
                    <i class="fa fa-money"></i>
                    <span>Expenses</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fa fa-download"></i>
                    <span>Purchase Transaction</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fa fa-upload"></i>
                    <span>Sales</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fa fa-cart-arrow-down"></i>
                    <span>Active Transactions</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fa fa-cart-arrow-down"></i>
                    <span>New Transactions</span>
                </a>
            </li>
            <li class="header">Reports</li>
            <li>
                <a href="#">
                    <i class="fa fa-line-chart"></i>
                    <span>Sales Reports</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fa fa-file-text"></i>
                    <span>Financial Reports</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fa fa-archive"></i>
                    <span>Inventory Reports</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fa fa-clock-o"></i>
                    <span>User Activity Reports</span>
                </a>
            </li>
            <li class="header">SYSTEM</li>
            <li>
                <a href="#">
                    <i class="fa fa-user"></i>
                    <span>User</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fa fa-cogs"></i>
                    <span>Settings</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fa fa-user-circle-o"></i>
                    <span>Profile</span>
                </a>
            </li>
        </ul>
    </section>
    <!-- end sidebar menu -->
</aside>
