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
                                        <h5>Edit Data Komponen</h5>
                                    </div>
                                    <div class="col"></div>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-12">
                                            <form @submit.prevent="updateKomponen">
                                                <div class="row mb-3">
                                                    <label for="namaKomponen" class="col-sm-3 col-form-label">Nama
                                                        Komponen</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control" id="namaKomponen"
                                                            v-model.trim="$v.itemKomponen.namaKomponen.$model" :class="{
                                                                'is-invalid': validationStatus(
                                                                    $v.itemKomponen.namaKomponen
                                                                ),
                                                            }" />
                                                        <div v-if="!$v.itemKomponen.namaKomponen.required"
                                                            class="invalid-feedback">
                                                            Nama komponen harus diisi
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
import { ipBackend } from '@/ipBackend';
import axios from "axios";
import { required } from "vuelidate/lib/validators";

export default {
    name: "FormEditKomponenView",
    data() {
        return {
            itemKomponen: {},
        };
    },

    validations: {
        itemKomponen: {
            namaKomponen: { required },
        },
    },

    created: function () {
        this.getKomponenById();
    },

    methods: {
        validationStatus: function (validation) {
            return typeof validation != "undefined" ? validation.$error : false;
        },

        async getKomponenById() {
            try {
                let dataToken = localStorage.getItem('token')
                const dataKomponen = await axios.get(
                    `${ipBackend}/komponen/detailsById/${this.$route.params.id}`, {
                        headers: {
                            token: dataToken
                        }
                    }
                );
                this.itemKomponen = dataKomponen.data.data[0];
            } catch (error) {
                console.log(error);
            }
        },

        async updateKomponen() {
            try {
                let dataToken = localStorage.getItem('token')
                await axios.post(`${ipBackend}/komponen/update`, this.itemKomponen, {
                    headers: {
                        token: dataToken
                    }
                });
                this.$swal({
                    icon: "success",
                    title: "Sukses",
                    text: "Data komponen berhasil diupdate",
                    showConfirmButton: false,
                    timer: 3000,
                });
                this.$router.push("/komponen");
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