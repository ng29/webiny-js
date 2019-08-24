// @flow
import { hot } from "react-hot-loader";
import React, { Fragment } from "react";
import { UiProvider } from "@webiny/app/context/ui";
import { registerPlugins, getPlugins } from "@webiny/plugins";
import { Theme as AdminTheme } from "@webiny/app-admin";
import { PageBuilderProvider } from "@webiny/app-page-builder/context";
import { Security } from "@webiny/app-security/components";
import { I18NProvider } from "@webiny/app-i18n/components";
import Login from "@webiny/app-security/admin/views/Login";
import { CircularProgress } from "@webiny/ui/Progress";
import myTheme from "theme";
import "./App.scss";
import plugins from "./plugins";

registerPlugins(plugins);

// Execute `init` plugins, they may register more plugins dynamically
getPlugins("webiny-init").forEach(plugin => plugin.callback());

const App = () => {
    return (
        <UiProvider>
            <I18NProvider>
                <Security>
                    {({ initialLoad, authenticated, notAuthenticated }) => (
                        <PageBuilderProvider theme={myTheme} isEditor>
                            <AdminTheme>
                                {initialLoad(<CircularProgress />)}
                                {authenticated(
                                    <Fragment>
                                        {getPlugins("route").map((pl: Object) =>
                                            React.cloneElement(pl.route, {
                                                key: pl.name,
                                                exact: true
                                            })
                                        )}
                                    </Fragment>
                                )}
                                {notAuthenticated(<Login />)}
                            </AdminTheme>
                        </PageBuilderProvider>
                    )}
                </Security>
            </I18NProvider>
        </UiProvider>
    );
};

export default hot(module)(App);
