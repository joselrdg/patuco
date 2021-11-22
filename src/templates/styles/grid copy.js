const grid = [
  {
    name: "scale_s8",
    items: ["transform: scale(0.8)"],
  },
  {
    name: "_f_l",
    items: ["float: left"],
  },
  {
    name: "_f_r",
    items: ["float: right"],
  },
  // {
  //   name: "_row",
  //   items: ["display: flex", "flex-wrap: wrap", "justify-content: center"],
  //   after: ["content: ''", "clear: both", "display: table"],
  // },
  {
    name: 'grind',
    template: `
------------------------------------  

.media_l_d_f_fd_rr {
  display: flex;
  flex-direction: row;
}
.media_l_d_f_fd_c {
  display: flex;
  flex-direction: column;
}




--

@media only screen and (max-width: 768px) {
  .media_d_f_fd_rr {
    display: flex;
    flex-direction: column-reverse;
  }
  .media_d_f_fd_c {
    display: flex;
    flex-direction: row;
  }
  .media_rotate90 {
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
  }

  .media_rotate-90 {
    -webkit-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    transform: rotate(-90deg);
  }

  .media_width100 {
    width: 100%;
  }
}

--


@media only screen and (max-width: 1200px) {
  .media_l_d_f_fd_rr {
    display: flex;
    flex-direction: column-reverse;
  }
  .media_l_d_f_fd_c {
    display: flex;
    flex-direction: row;
  }
  .media_l_rotate90 {
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
  }

  .media_l_rotate-90 {
    -webkit-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    transform: rotate(-90deg);
  }

  .media_l_width100 {
    width: 100%;
  }
}




    ----------------------------
._row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
      
._row::after {
  content: "";
  clear: both;
  display: table;
}
      
._f_l {
  float: left;
}

._f_r {
  float: right;
}
      
[class*="col_"] {
  float: left;
  /* padding: 15px; */
}

[class*="floatCl_"] {
  float: left;
  /* padding: 15px; */
}
      
/* For mobile phones: */
[class*="col_"] {
  width: 100%;
}
      
[class*="floatCl_"] {
  width: 90%;
  left: calc(50% - (90% / 2));
}
      
/* scale */

.scale_s8 {
  transform: scale(0.8);
}

@media only screen and (min-width: 600px) {
  /* For tablets: */
  .col_s_1 {
    width: 8.33%;
  }
  .floatCl_s_1 {
    width: 8.33%;
    left: calc(50% - (8.33% / 2));
  }
  .col_s_2 {
    width: 16.66%;
  }
  .floatCl_s_2 {
    width: 16.66%;
    left: calc(50% - (16.66% / 2));
  }
  .col_s_3 {
    width: 25%;
  }
  .floatCl_s_3 {
    width: 25%;
    left: calc(50% - (25% / 2));
  }
  .col_s_4 {
    width: 33.33%;
  }
  .floatCl_s_4 {
    width: 33.33%;
    left: calc(50% - (33.33% / 2));
  }
  .col_s_5 {
    width: 41.66%;
  }
  .floatCl_s_5 {
    width: 41.66%;
    left: calc(50% - (41.66% / 2));
  }
  .col_s_6 {
    width: 50%;
  }
  .floatCl_s_6 {
    width: 50%;
    left: calc(50% - (50% / 2));
  }
  .col_s_7 {
    width: 58.33%;
  }
  .floatCl_s_7 {
    width: 58.33%;
    left: calc(50% - (58.33% / 2));
  }
  .col_s_8 {
    width: 66.66%;
  }
  .floatCl_s_8 {
    width: 66.66%;
    left: calc(50% - (66.66% / 2));
  }
  .col_s_9 {
    width: 75%;
  }
  .floatCl_s_9 {
    width: 75%;
    left: calc(50% - (75% / 2));
  }
  .col_s_10 {
    width: 83.33%;
  }
  .floatCl_s_10 {
    width: 83.33%;
    left: calc(50% - (83.33% / 2));
  }
  .col_s_11 {
    width: 91.66%;
  }
  .floatCl_s_11 {
    width: 91.66%;
    left: calc(50% - (91.66% / 2));
  }
  .col_s_12 {
    width: 100%;
  }
  .floatCl_s_12 {
    width: 100%;
    left: calc(50% - (100% / 2));
  }
}

@media only screen and (min-width: 768px) {
  /* For desktop: */
  .col_1 {
    width: 8.33%;
  }
  .floatCl_1 {
    width: 8.33%;
    left: calc(50% - (8.33% / 2));
  }
  .col_2 {
    width: 16.66%;
  }
  .floatCl_2 {
    width: 16.66%;
    left: calc(50% - (16.66% / 2));
  }
  .col_3 {
    width: 25%;
  }
  .floatCl_3 {
    width: 25%;
    left: calc(50% - (25% / 2));
  }
  .col_4 {
    width: 33.33%;
  }
  .floatCl_4 {
    width: 33.33%;
    left: calc(50% - (33.33% / 2));
  }
  .col_5 {
    width: 41.66%;
  }
  .floatCl_5 {
    width: 41.66%;
    left: calc(50% - (41.66% / 2));
  }
  .col_6 {
    width: 50%;
  }
  .floatCl_6 {
    width: 50%;
    left: calc(50% - (50% / 2));
  }
  .col_7 {
    width: 58.33%;
  }
  .floatCl_7 {
    width: 58.33%;
    left: calc(50% - (58.33% / 2));
  }
  .col_8 {
    width: 66.66%;
  }
  .floatCl_8 {
    width: 66.66%;
    left: calc(50% - (66.66% / 2));
  }
  .col_9 {
    width: 75%;
  }
  .floatCl_9 {
    width: 75%;
    left: calc(50% - (75% / 2));
  }
  .col_10 {
    width: 83.33%;
  }
  .floatCl_10 {
    width: 83.33%;
    left: "calc(50% - (83.33%/2))";
  }
  .col_11 {
    width: 91.66%;
  }
  .floatCl_11 {
    width: 91.66%;
    left: calc(50% - (91.66% / 2));
  }
  .col_12 {
    width: 100%;
  }
  .floatCl_12 {
    width: 100%;
    left: calc(50% - (100% / 2));
  }

  .media_mr_0 {
    margin-right: 0rem;
  }
  .media_mr_1 {
    margin-right: 1rem;
  }
  .media_mr_2 {
    margin-right: 2rem;
  }
  .media_mr_3 {
    margin-right: 3rem;
  }
  .media_mr_4 {
    margin-right: 4rem;
  }
  .media_mr_5 {
    margin-right: 5rem;
  }
}

@media only screen and (min-width: 1200px) {
  .col_l_1 {
    width: 8.33%;
  }
  .floatCl_l_1 {
    width: 8.33%;
    left: calc(50% - (8.33% / 2));
  }
  .col_l_2 {
    width: 16.66%;
  }
  .floatCl_l_2 {
    width: 16.66%;
    left: calc(50% - (16.66% / 2));
  }
  .col_l_3 {
    width: 25%;
  }
  .floatCl_l_3 {
    width: 25%;
    left: calc(50% - (25% / 2));
  }
  .col_l_4 {
    width: 33.33%;
  }
  .floatCl_l_4 {
    width: 33.33%;
    left: calc(50% - (33.33% / 2));
  }
  .col_l_5 {
    width: 41.66%;
  }
  .floatCl_l_5 {
    width: 41.66%;
    left: calc(50% - (41.66% / 2));
  }
  .col_l_6 {
    width: 50%;
  }
  .floatCl_l_6 {
    width: 50%;
    left: calc(50% - (50% / 2));
  }
  .col_l_7 {
    width: 58.33%;
  }
  .floatCl_l_7 {
    width: 58.33%;
    left: calc(50% - (58.33% / 2));
  }
  .col_l_8 {
    width: 66.66%;
  }
  .floatCl_l_8 {
    width: 66.66%;
    left: calc(50% - (66.66% / 2));
  }
  .col_l_9 {
    width: 75%;
  }
  .floatCl_l_9 {
    width: 75%;
    left: calc(50% - (75% / 2));
  }
  .col_l_10 {
    width: 83.33%;
  }
  .floatCl_l_10 {
    width: 83.33%;
    left: calc(50% - (83.33% / 2));
  }
  .col_l_11 {
    width: 91.66%;
  }
  .floatCl_l_11 {
    width: 91.66%;
    left: calc(50% - (91.66% / 2));
  }
  .col_l_12 {
    width: 100%;
  }
  .floatCl_l_12 {
    width: 100%;
    left: calc(50% - (100% / 2));
  }

  .media_l_mr_0 {
    margin-right: 0rem;
  }
  .media_l_mr_1 {
    margin-right: 1rem;
  }
  .media_l_mr_2 {
    margin-right: 2rem;
  }
  .media_l_mr_3 {
    margin-right: 3rem;
  }
  .media_l_mr_4 {
    margin-right: 4rem;
  }
  .media_l_mr_5 {
    margin-right: 5rem;
  }

  .media_l_d_f_fd_rr {
    display: flex;
    flex-direction: row;
  }
  .media_l_d_f_fd_c {
    display: flex;
    flex-direction: column;
  }
}
/* Container */
._cont {
  margin: var(--container);
}

@media only screen and (max-width: 768px) {
  .media_d_f_fd_rr {
    display: flex;
    flex-direction: column-reverse;
  }
  .media_d_f_fd_c {
    display: flex;
    flex-direction: row;
  }
  .media_rotate90 {
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
  }

  .media_rotate-90 {
    -webkit-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    transform: rotate(-90deg);
  }

  .media_width100 {
    width: 100%;
  }
}

@media only screen and (max-width: 1200px) {
  .media_l_d_f_fd_rr {
    display: flex;
    flex-direction: column-reverse;
  }
  .media_l_d_f_fd_c {
    display: flex;
    flex-direction: row;
  }
  .media_l_rotate90 {
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
  }

  .media_l_rotate-90 {
    -webkit-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    transform: rotate(-90deg);
  }

  .media_l_width100 {
    width: 100%;
  }
}`,
  },
];

module.exports = grid;
