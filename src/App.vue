<template>
  <div class="wrapper">
    <router-view />
  </div>
</template>

<style>
.tombol {
  text-align: center;
}

.btn-sm {
  margin: 2px;
}

thead.header-tabel {
  background-color: #343739;
  color: white;
}

thead th {
  text-align: center;
}

button.page-link {
  display: inline-block;
}

button.page-link {
  font-size: 20px;
  color: #29b3ed;
  font-weight: 500;
}

div.load {
  justify-content: center;
  justify-items: center;
  margin: 0 auto;
}

/* div.tab-judul {
  text-align: center;
  color: white;
  background-color: #262b32;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
} */

.tbl-fixed {
  overflow-x: scroll;
}

table {
  min-width: max-content;
}

ul > li {
  padding: 0;
  margin: 0;
}

div.main-sidebar.sidebar-menu {
  background-color: black;
}

table th {
  padding: 25px;
}
table td ul {
  margin: 0;
  padding: 0;
  list-style-type: square;
  list-style-position: inside; /* Removes default bullet points */
}
.table-wrap {
      table-layout: auto !important; /* Ensures automatic table layout */
      word-wrap: break-word; /* Allows text to wrap within cells */
    }
</style>