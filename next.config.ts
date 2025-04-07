import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    webpack: (config, {isServer}) => {
        config.resolve ??= {};
        config.resolve.fallback ??= {};

        config.resolve.fallback = {
            ...config.resolve.fallback,
            module: false,
            dgram: false,
            dns: false,
            fs: false,
            http2: false,
            net: false,
            tls: false,
            child_process: false,
            'webpack/lib/javascript/BasicEvaluatedExpression': require.resolve('webpack/lib/javascript/BasicEvaluatedExpression')
        };

        return config;
    },
};

export default nextConfig;