import * as yup from "yup";
export const contactSchema = yup.object({
  fullname: yup.string().required("وارد کردن نام الزامیست"),
  photo: yup.string().url("آدرس عکس نا معتبر است"),
  mobile: yup.number().required("وارد کردن شماره موبایل الزامیست"),
  email: yup
    .string()
    .email("ایمیل معتبر وارد کنید")
    .required("وارد کردن ایمیل الزامیست"),
  job: yup.string().nullable(),
  group: yup.string().required("گروه خود را مشخص کنید"),
});
