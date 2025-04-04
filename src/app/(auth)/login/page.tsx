import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import BackgroundBlurLeft from "@/components/vectors/BackgroundBlurLeft";
import BackgroundBlurRight from "@/components/vectors/BackgroundBlurRight";

const LoginPage = () => {
  return (
    <>
      <BackgroundBlurLeft />
      <div className="relative w-[100vw] h-[100vh] bg-[#FFFBEF]">
        <div
          className="fixed top-[50%] left-[50%]"
          style={{
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="card rounded-[24px] px-[32px] py-[18px] border-0 "
            style={{
              boxShadow: "0 16px 32px -4px rgba(252, 69, 84, 0.07)",
            }}
          >
            <div className="card-body">
              <div className="container text-center pb-[28px]">
                <h5 className="font-[600] leading-[100%] text-[30px]">
                  Bienvenido a{" "}
                </h5>
                <h3 className="font-[800] leading-[100%] text-[37px] tracking-[4px]">
                  NEXUSCORE
                </h3>
                <h5 className="font-[400] leading-[100%] text-[24px]">
                  Inicia sesión
                </h5>
              </div>
              <div className="card-content">
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
      <BackgroundBlurRight />
    </>
  );
};

export default LoginPage;
