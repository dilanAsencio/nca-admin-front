import ReCAPTCHA from "react-google-recaptcha";

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

interface CaptchaProps {
  recaptchaRef: any;
  setCaptchaValue: any;
}

const Captcha: React.FC<CaptchaProps> = ({recaptchaRef, setCaptchaValue} ) => {
  return (
    <ReCAPTCHA
      ref={recaptchaRef}
      sitekey={siteKey}
      onChange={(value) => setCaptchaValue(value)}
    />
  );
};

export default Captcha;
