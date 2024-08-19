<template>
    <aside class="main-sidebar sidebar-dark-primary">
        <!-- Brand Logo -->
        <a href="#" class="brand-link">
            <img src="../../public/logo-presisi.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
                style="opacity: 0.8" />
            <span class="brand-text font-weight-light"><b>MDO PRESISI</b></span>
        </a>

        <!-- Sidebar -->
        <div class="sidebar">
            <nav class="mt-2">
                <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                    data-accordion="false">
                    <li class="nav-item">
                        <router-link to="/dashboard" class="nav-link">
                            <i class="nav-icon fas fa-tachometer-alt"></i>
                            <p>Dashboard</p>
                        </router-link>
                    </li>

                    <li class="nav-header">MASTER</li>
                    <li class="nav-item">
                        <router-link to="/jabatan" class="nav-link">
                            <i class="nav-icon fas fa-solid fa-street-view"></i>
                            <p>Jabatan</p>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/manpower" class="nav-link">
                            <i class="nav-icon fas fa-solid fa-user-tie"></i>
                            <p>Manpower</p>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/fuelman" class="nav-link">
                            <i class="nav-icon fas fa-solid fa-user-tie"></i>
                            <p>Fuelman</p>
                        </router-link>
                    </li>
                    <!-- <li class="nav-item">
                        <router-link to="/komponen" class="nav-link">
                            <i class="nav-icon fas fa-solid fa-toolbox"></i>
                            <p>Komponen</p>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/pelumas" class="nav-link">
                            <i class="nav-icon fas fa-solid fa-vial"></i>
                            <p>Pelumas</p>
                        </router-link>
                    </li> -->
                    <li class="nav-item">
                        <router-link to="/unit" class="nav-link">
                            <i class="nav-icon fas fa-solid fa-layer-group"></i>
                            <p>Unit</p>
                        </router-link>
                    </li>
                    <li class="nav-header">WORKING PROCESS</li>
                    <li class="nav-item">
                        <router-link to="/fuel-refill" class="nav-link">
                            <i class="nav-icon fas fa-solid fa-gas-pump"></i>
                            <p>Fuel Refill</p>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/equipment-repair" class="nav-link">
                            <i class="nav-icon fas fa-solid fa-wrench"></i>
                            <p>Equipment Repair</p>
                        </router-link>
                    </li>
                    <li class="nav-header">USER MANAGEMENT</li>
                    <li class="nav-item">
                        <router-link to="/user" class="nav-link">
                            <i class="nav-icon fas fa-user"></i>
                            <p>User</p>
                        </router-link>
                    </li>
                </ul>
            </nav>
            <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
    </aside>
</template>

<script>
export default {
    name: "AppSideBar",
    data() {
        return {};
    },

    mounted() { },

    computed: {},

    methods: {},
};
</script>

<style lang="scss"></style>