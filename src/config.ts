interface IConfig {
  port: number;
}

const config: IConfig = {
  port: Number(process.env.PORT),
};

export default config;
