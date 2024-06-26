import Swal from "sweetalert2";

// export const question = (title, text ) => {
//   return Swal.fire({
//     title,
//     text,
//     icon: 'question',
//     showCancelButton: true,
//   });
// };

export const toast = (title, icon = "info", timer = 4000) => {
  // success | warning | question | error | info
  Swal.fire({
    position: "top-up",
    icon:"success",
    title,
    showConfirmButton: false,
    timer,
  });
};
export const error = (title, icon = "danger", timer = 4000) => {
  // success | warning | question | error | info
  Swal.fire({
    position: "top_up",
    icon:"error",
    title,
    showConfirmButton: false,
    timer,
  });
};
export const question = async ( ) => {
  const result = await Swal.fire({
  position: "top",
  title: "Are you sure?",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#0d3b66",//#ff0000/#3085d6
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, sign-out!"
})
return result.isConfirmed;
}
// export const question = async ( ) => {
//   const result = await Swal.fire({
//   title: 'Top drawer 👋',
//   position: 'top',
//   showClass: {
//     popup: `
//     animate__animated
//     animate__fadeInDown
//     animate__faster
//   `,
//   },
//   hideClass: {
//     popup: `
//     animate__animated
//     animate__fadeOutUp
//     animate__faster
//   `,
//   },
//   grow: 'row',
//   showConfirmButton: false,
//   showCloseButton: true,
// })
// return result.isConfirmed;
// }