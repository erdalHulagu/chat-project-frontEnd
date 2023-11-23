import Swal from "sweetalert2";

export const question = (title, text ) => {
  return Swal.fire({
    title,
    text,
    icon: 'question',
    showCancelButton: true,
  });
};

export const toast = (title, icon = "info", timer = 4000) => {
  // success | warning | question | error | info
  Swal.fire({
    position: "top-end",
    icon,
    title,
    showConfirmButton: false,
    timer,
  });
};