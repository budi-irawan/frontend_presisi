<template>
  <div>
    <div class="hold-transition login-page">
      <div class="login-box">
        <div class="card shadow-lg">
          <div class="card-header text-center">
            <img
              src="../../../public/logo-presisi-login.jpg"
              alt="AdminLTE Logo"
              class="brand-image"
            />
          </div>
          <div class="card-body">
            <form>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Username"
                  v-model="user.username"
                  v-on:keyup.enter="goToInputPassword"
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-user"></span>
                  </div>
                </div>
              </div>
              <div class="input-group mb-3">
                <input
                  id="inputPassword"
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  v-model="user.password"
                  v-on:keyup.enter="login()"
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div class="input-group mb-3">
                <button
                  type="button"
                  class="btn btn-primary btn-block"
                  @click="login()"
                >
                  Login
                  <div class="loading" v-if="loading">
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ipBackend } from "@/ipBackend";

export default {
  name: "LoginUserView",
  data() {
    return {
      loading: false,
      user: {
        username: null,
        password: null,
      },
    };
  },

  beforeMount() {
    if (localStorage.getItem("token")) {
      this.$router.push({ path: "/dashboard" });
    }
  },

  created() {
    this.$eventBus.$on("loadingStatus", (payload) => {
      this.loading = payload;
    });
  },

  methods: {
    goToInputPassword: function () {
      document.getElementById("inputPassword").focus();
    },

    login() {
      this.$eventBus.$emit("loadingStatus", true);
      axios.post(`${ipBackend}/user/login`, this.user).then((result) => {
        this.$eventBus.$emit("loadingStatus", false);
        if (result.data.status != 200) {
          this.$VueIziToast.error({
            title: "Error",
            message: result.data.message,
            position: "topCenter",
          });
        } else {
          localStorage.setItem("token", result.data.token);
          this.$router.push({ path: "/dashboard" });
          this.$VueIziToast.success({
            title: "Sukses",
            message: "Login Berhasil",
            position: "center",
          });
        }
      });
    },
  },
};
</script>

<style lang="scss"></style>