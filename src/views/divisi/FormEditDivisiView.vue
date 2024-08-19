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
                                        <h5>Edit Data Divisi</h5>
                                    </div>
                                    <div class="col"></div>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-12">
                                            <form @submit.prevent="updateDivisi">
                                                <div class="row mb-3">
                                                    <label for="namaDivisi" class="col-sm-3 col-form-label">Nama
                                                        Divisi</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control" id="namaDivisi"
                                                            v-model.trim="$v.itemDivisi.namaDivisi.$model" :class="{
                                                                'is-invalid': validationStatus(
                                                                    $v.itemDivisi.namaDivisi
                                                                ),
                                                            }" />
                                                        <div v-if="!$v.itemDivisi.namaDivisi.required"
                                                            class="invalid-feedback">
                                                            Nama divisi harus diisi
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
    name: "FormEditDivisiView",
    data() {
        return {
            itemDivisi: {},
        };
    },

    validations: {
        itemDivisi: {
            namaDivisi: { required },
        },
    },

    created: function () {
        this.getDivisiById();
    },

    methods: {
        validationStatus: function (validation) {
            return typeof validation != "undefined" ? validation.$error : false;
        },

        async getDivisiById() {
            try {
                let dataToken = localStorage.getItem('token')
                const dataDivisi = await axios.get(
                    `${ipBackend}/divisi/detailsById/${this.$route.params.id}`, {
                        headers: {
                            token: dataToken
                        }
                    }
                );
                this.itemDivisi = dataDivisi.data.data[0];
            } catch (error) {
                console.log(error);
            }
        },

        async updateDivisi() {
            try {
                let dataToken = localStorage.getItem('token')
                await axios.post(`${ipBackend}/divisi/update`, this.itemDivisi, {
                    headers: {
                        token: dataToken
                    }
                });
                this.$swal({
                    icon: "success",
                    title: "Sukses",
                    text: "Data divisi berhasil diupdate",
                    showConfirmButton: false,
                    timer: 3000,
                });
                this.$router.push("/divisi");
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