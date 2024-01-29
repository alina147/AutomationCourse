import { test, expect } from "@playwright/test";
import { title } from 'process';

const api_URL = 'https://reqres.in/api';
const user_token = "QpwL5tke4Pnpja7X4";

test.describe("Rest Api Test Suite", () => {
  test("check success create user flow", async ({ request }) => {
    const response = await request.post(api_URL + "/register", {
      headers: {
        'accept': 'application/json',
        'Content-Type': `application/json`,
      },
      data: {
        email: "eve.holt@reqres.in",
        password: "pistol"
      },
    });

    const responsJson = await response.json();
    expect(response.status()).toBe(200);
    expect(await responsJson.token).toBe(user_token);
    expect(await responsJson.id).toBe(4);
  });
  test("check failed create user flow", async ({ request }) => {
    const response = await request.post(api_URL + "/register", {
      headers: {
        'accept': 'application/json',
        'Content-Type': `application/json`,
      },
      data: {
        email: "sydney@fife",
      },
    });

    const responsJson = await response.json();
    expect(response.status()).toBe(400);
    expect(await responsJson.error).toBe("Missing password");
  });
  test("check success login", async ({ request }) => {
    const response = await request.post(api_URL + "/login", {
      headers: {
        'accept': 'application/json',
        'Content-Type': `application/json`,
      },
      data: {
        email: "eve.holt@reqres.in",
        password: "cityslicka"
      },
    });

    const responsJson = await response.json();
    expect(response.status()).toBe(200);
    expect(await responsJson.token).toBe(user_token);
  });
  test("check failed login", async ({ request }) => {
    const response = await request.post(api_URL + "/login", {
      headers: {
        'accept': 'application/json',
        'Content-Type': `application/json`,
      },
      data: {
        email: "peter@klaven",
      },
    });

    const responsJson = await response.json();
    expect(response.status()).toBe(400);
    expect(await responsJson.error).toBe("Missing password");
  });
  test("check user creation", async ({ request }) => {
    const response = await request.post(api_URL + "/users", {
      data: {
        name: "morpheus",
        job: "QA",
      },
    });
    const responsJson = await response.json();
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);
    expect(await responsJson.name).toBe("morpheus");
    expect(await responsJson.job).toBe("QA");
    expect(await responsJson.id).toHaveAttribute;
  });
  test("check user update/put", async ({ request }) => {
    const response = await request.put(api_URL + "/users/2", {
      data: {
        name: "morpheus",
        job: "zion resident",
      },
    });
    const responsJson = await response.json();
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(await responsJson.name).toBe("morpheus");
    expect(await responsJson.job).toBe("zion resident");
  });
  test("check user update/patch", async ({ request }) => {
    const response = await request.patch(api_URL + "/users/2", {
      data: {
        name: "morpheus1",
        job: "zion resident",
      },
    });
    const responsJson = await response.json();
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(await responsJson.name).toBe("morpheus1");
    expect(await responsJson.job).toBe("zion resident");
  });
  test("check user removing", async ({ request }) => {
    const response = await request.delete(api_URL + "/users/2", {});

    expect(response.status()).toBe(204);
  });
});



