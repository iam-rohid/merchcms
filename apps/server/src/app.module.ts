import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { GlobalModule } from "./global/global.module";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "schema.gql"),
      sortSchema: true,
      cors: {
        origin: "*",
        credentials: true,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    GlobalModule,
    PassportModule,
  ],
})
export class AppModule {}
