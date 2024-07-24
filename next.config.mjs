/** @type {import('next').NextConfig} */
import withImages from "next-images";

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
};

export default withImages(nextConfig);
