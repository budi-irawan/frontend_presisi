<template>
  <div>
    <app-nav-bar />
    <app-side-bar />
    <div class="content-wrapper">
      <router-view />
      <section class="content">
        <div class="container-fluid pt-3">
          <div class="row mt-3 mb-4">
            <div class="col">
              <div class="card card-outline card-primary">
                <div class="row">
                  <div class="col"></div>
                  <div class="col tab-judul">
                    <h5>Edit Data Unit</h5>
                  </div>
                  <div class="col"></div>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-12">
                      <form @submit.prevent="updateUnit">
                        <div class="row mb-3">
                          <label for="namaUnit" class="col-sm-3 col-form-label"
                            >Nama Unit<span class="text-danger"> *</span></label
                          >
                          <div class="col-sm-9">
                            <input
                              type="text"
                              class="form-control"
                              id="namaUnit"
                              v-model.trim="$v.itemUnit.namaUnit.$model"
                              :class="{
                                'is-invalid': validationStatus(
                                  $v.itemUnit.namaUnit
                                ),
                              }"
                            />
                            <div
                              v-if="!$v.itemUnit.namaUnit.required"
                              class="invalid-feedback"
                            >
                              Nama unit harus diisi
                            </div>
                          </div>
                        </div>

                        <div class="row mb-3">
                          <label
                            for="nomorPolisi"
                            class="col-sm-3 col-form-label"
                            >Nomor Polisi<span class="text-danger">
                              *</span
                            ></label
                          >
                          <div class="col-sm-9">
                            <input
                              type="text"
                              class="form-control"
                              id="nomorPolisi"
                              v-model.trim="$v.itemUnit.nomorPolisi.$model"
                              :class="{
                                'is-invalid': validationStatus(
                                  $v.itemUnit.nomorPolisi
                                ),
                              }"
                            />
                            <div
                              v-if="!$v.itemUnit.nomorPolisi.required"
                              class="invalid-feedback"
                            >
                              Nomor polisi harus diisi
                            </div>
                          </div>
                        </div>

                        <div class="row mb-3">
                          <label
                            for="nomorMesin"
                            class="col-sm-3 col-form-label"
                            >Nomor Mesin<span class="text-danger">
                              *</span
                            ></label
                          >
                          <div class="col-sm-9">
                            <input
                              type="text"
                              class="form-control"
                              id="nomorMesin"
                              v-model.trim="$v.itemUnit.nomorMesin.$model"
                              :class="{
                                'is-invalid': validationStatus(
                                  $v.itemUnit.nomorMesin
                                ),
                              }"
                            />
                            <div
                              v-if="!$v.itemUnit.nomorMesin.required"
                              class="invalid-feedback"
                            >
                              Nomor mesin harus diisi
                            </div>
                          </div>
                        </div>

                        <div class="row mb-3">
                          <label for="jenisAlat" class="col-sm-3 col-form-label"
                            >Jenis Alat<span class="text-danger">*</span></label
                          >
                          <div class="col-sm-9">
                            <select
                              class="form-control"
                              aria-label="Default select example"
                              v-model.trim="$v.itemUnit.jenisAlatId.$model"
                              :class="{
                                'is-invalid': validationStatus(
                                  $v.itemUnit.jenisAlatId
                                ),
                              }"
                            >
                              <option
                                v-for="rowjenisAlat in itemjenisAlat"
                                :key="rowjenisAlat.id"
                                :value="rowjenisAlat.id"
                              >
                                {{ rowjenisAlat.namaJenisAlat }}
                              </option>
                            </select>
                            <div
                              v-if="!$v.itemUnit.jenisAlatId.required"
                              class="invalid-feedback"
                            >
                              Jenis alat harus diisi
                            </div>
                          </div>
                        </div>

                        <button type="submit" class="btn btn-primary">
                          <i class="fas fa-save"></i>
                          Update
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <app-footer />
    <control-side-bar />
  </div>
</template>

<script>
import { ipBackend } from "@/ipBackend";
import axios from "axios";
import { required } from "vuelidate/lib/validators";

export default {
  name: "FormEditUnitView",
  data() {
    return {
      itemUnit: {},

      itemjenisAlat: [],
    };
  },

  validations: {
    itemUnit: {
      namaUnit: { required },
      nomorPolisi: { required },
      nomorMesin: { required },
      jenisAlatId: { required },
    },
  },

  created: function () {
    this.getUnitById();
    this.getAllJenisAlat();
  },

  methods: {
    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },

    async getAllJenisAlat() {
      try {
        let dataToken = localStorage.getItem("token");
        const dataJenisAlat = await axios.get(`${ipBackend}/jenis-alat/list`, {
          headers: {
            token: dataToken,
          },
        });
        let result = dataJenisAlat.data.data;
        this.itemjenisAlat = result;
      } catch (error) {
        console.log(error);
      }
    },

    async getUnitById() {
      try {
        let dataToken = localStorage.getItem("token");
        const dataUnit = await axios.get(
          `${ipBackend}/unit/detailsById/${this.$route.params.id}`,
          {
            headers: {
              token: dataToken,
            },
          }
        );

        this.itemUnit = dataUnit.data.data;
      } catch (error) {
        console.log(error);
      }
    },

    async updateUnit() {
      try {
        this.$v.$touch();
        if (this.$v.$pendding || this.$v.$error) return;
        let dataToken = localStorage.getItem("token");
        await axios.post(`${ipBackend}/unit/update`, this.itemUnit, {
          headers: {
            token: dataToken,
          },
        });
        this.$swal({
          icon: "success",
          title: "Sukses",
          text: "Data unit berhasil diupdate",
          showConfirmButton: false,
          timer: 3000,
        });
        this.$router.push("/unit");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>


<style>
div.tab-judul {
  text-align: center;
  color: white;
  background-color: #0d6efd;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>