import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "../../services/api"; // استفاده از سرویسی که ساختی
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

// ۱. تعریف قوانین (Schema)
const loginSchema = z.object({
  email: z.string().email("ایمیل معتبر نیست").min(1, "ایمیل الزامی است"),
  password: z.string().min(6, "رمز عبور حداقل ۶ کاراکتر"),
  username: z.string().min(3, "نام کاربری حداقل ۳ کاراکتر").max(20, "نام کاربری حداکثر ۲۰ کاراکتر"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  // ۲. تابع اصلی ارسال دیتا
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setServerError(""); // پاک کردن خطاهای قبلی
    
    try {
      // ارسال درخواست POST به سرور تستی
      const response = await api.post("/posts", data); 
      console.log("پاسخ سرور:", response.data);
      alert("خوش آمدید! ورود موفقیت‌آمیز بود.");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error: unknown) {
      setServerError("ایمیل یا رمز عبور اشتباه است یا سرور در دسترس نیست.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl border border-gray-100">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">ورود به پنل</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input 
          label="نام کاربری" 
          {...register("username")}
          error={errors.username?.message}
        />
        <Input 
          label="ایمیل" 
          {...register("email")}
          error={errors.email?.message}
        />
        
        <Input 
          label="رمز عبور" 
          type="password" 
          {...register("password")}
          error={errors.password?.message}
        />

        {/* ۳. نمایش خطای سرور در صورت وجود */}
        {serverError && <p className="text-sm text-red-600 text-center">{serverError}</p>}

        <Button isLoading={isLoading} type="submit" className="w-full">
          ورود به حساب
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;