import { AnimatedOutlet } from "@/components/AnimatedOutlet";
import PageTransition from "@/components/layout/PageTransition";

import { Layout } from "../../components/Layout";
import { Form } from "./Form";
import { VerifyEmail } from "./VerifyEmail";

const SignUp = () => {
  return (
    <Layout>
      <PageTransition>
        <AnimatedOutlet />
      </PageTransition>
    </Layout>
  );
};

SignUp.Form = Form;
SignUp.VerifyEmail = VerifyEmail;

export { SignUp };
