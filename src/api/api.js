import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://158.160.61.127:9668/",
    prepareHeaders: (headers) => {
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlcm5lc3QifQ.32gxyl3-w_W7O7-QEVaxrbnyPnl7ihrXgRUq_PB2JoU";
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
            headers.set("mode", "no-cors");
        }
        return headers;
    },
});

export const api = createApi({
    reducerPath: "splitApi",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getDevice: builder.query({
            query: ({ uuid }) => ({
                url: `api/devices/info`,
                params: {
                    device_imei: uuid,
                },
            }),
            transformResponse: (res) => {
                console.log(res);
                return res;
            },
        }),
    }),
});

export const { useGetDeviceQuery } = api;
