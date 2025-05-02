import { time } from "console";
import { OpenAPIV3 } from "openapi-types";

export const swaggerSpec: OpenAPIV3.Document = {
	openapi: "3.0.0",
	info: {
		title: "166-karqo",
		version: "1.0.0",
		description: "API documentation description",
	},
	paths: {
		"/api/v1/auth/login": {
			post: {
				summary: "İstifadəçi login olur",
				tags: ["Auth"],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									email: {
										type: "string",
										example: "user@example.com",
									},
									password: {
										type: "string",
										example: "secret123",
									},
								},
							},
						},
					},
				},
				responses: {
					200: { description: "Uğurlu giriş" },
					401: { description: "Yanlış məlumat" },
				},
			},
		},
		"/api/v1/auth/register": {
			post: {
				summary: "Yeni istifadəçi qeydiyyatı",
				tags: ["Auth"],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									name: { type: "string" },
									surname: { type: "string" },
									pin: { type: "string" },
									serial_number: { type: "string" },
									address: { type: "string" },
									tax_id: { type: "string" },
									legal_entity: { type: "string" },
									station: { type: "string" },
									birthdate: {
										type: "string",
										format: "date",
									},
									sex: { type: "string" },
									nationality: { type: "string" },
									email: { type: "string" },
									password: { type: "string" },
									phone: { type: "string" },
									confirm_password: { type: "string" },
								},
							},
						},
					},
				},
				responses: {
					201: { description: "Qeydiyyat tamamlandı" },
					400: { description: "Yanlış və ya əskik məlumat" },
				},
			},
		},
		"/api/v1/package/create": {
			post: {
				summary: "Bağlama yaratmaq",
				tags: ["Bağlama"],
				security: [
					{
						bearerAuth: [],
					},
				],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									product_name: { type: "string" },
									amount: { type: "string" },
									following_number: { type: "number" },
									delivery: { type: "string" },
									weight: { type: "string" },
									store: { type: "string" },
								},
							},
						},
					},
				},
				responses: {
					201: { description: "Yeni bağılama yarandı" },
					400: { description: "Yanlış və ya əskik məlumat" },
				},
			},
		},
		"/api/v1/package/all": {
			get: {
				summary: "Bütün bağlamaları gör",
				tags: ["Bağlama"],
				security: [
					{
						bearerAuth: [],
					},
				],
				responses: {
					400: { description: "Yanlış və ya əskik məlumat" },
				},
			},
		},
		"/api/v1/package/change-status/{id}": {
			put: {
				summary: "Bağlamanın statusunu dəyiş",
				tags: ["Bağlama"],
				security: [
					{
						bearerAuth: [],
					},
				],
				parameters: [
					{
						name: "id",
						in: "path",
						required: true,
						description: "Package ID",
						schema: {
							type: "number",
						},
					},
				],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									status: { type: "string" },
								},
							},
						},
					},
				},
				responses: {
					200: { description: "Kateqoriya silindi" },
					404: { description: "Kateqoriya tapılmadı" },
				},
			},
		},
		"/api/v1/news/create": {
			post: {
				summary: "Xəbər yaratmaq",
				tags: ["Xəbər"],
				security: [
					{
						bearerAuth: [],
					},
				],
				requestBody: {
					required: true,
					content: {
						"multipart/form-data": {
							schema: {
								type: "object",
								properties: {
									tittle: { type: "string" },
									description: { type: "string" },
									img: {
										type: "string",
										format: "binary",
									},
								},
							},
						},
					},
				},
				responses: {
					201: { description: "Qeydiyyat tamamlandı" },
					400: { description: "Yanlış və ya əskik məlumat" },
				},
			},
		},
		"/api/v1/news/all": {
			get: {
				summary: "Bütün xəbərləri gör",
				tags: ["Xəbər"],
				responses: {
					500: { description: "Server error" },
				},
			},
		},
		"/api/v1/news/delete/{id}": {
			delete: {
				summary: "Xəbəri sil",
				tags: ["Xəbər"],
				security: [
					{
						bearerAuth: [],
					},
				],
				parameters: [
					{
						name: "id",
						in: "path",
						required: true,
						description: "Silinəcək xəbərin ID-si",
						schema: {
							type: "string",
							example: "12345",
						},
					},
				],
				responses: {
					200: { description: "Xəbər silindi" },
					404: { description: "Xəbər tapılmadı" },
				},
			},
		},
		"/api/v1/news/update/{id}": {
			put: {
				summary: "Xəbəri yenilə",
				tags: ["Xəbər"],
				security: [
					{
						bearerAuth: [],
					},
				],
				parameters: [
					{
						name: "id",
						in: "path",
						required: true,
						description: "Yeniləcək xəbərin ID-si",
						schema: {
							type: "string",
							example: "12345",
						},
					},
				],
				requestBody: {
					required: true,
					content: {
						"multipart/form-data": {
							schema: {
								type: "object",
								properties: {
									tittle: { type: "string" },
									description: { type: "string" },
									img: { type: "string", format: "binary" },
								},
							},
						},
					},
				},
				responses: {
					200: { description: "Xəbər yeniləndi" },
					404: { description: "Xəbər tapılmadı" },
					409: { description: "Xəbər artıq mövcuddur" },
				},
			},
		},
		"/api/v1/branch/create": {
			post: {
				summary: "Filial yaratmaq",
				tags: ["Filial"],
				security: [
					{
						bearerAuth: [],
					},
				],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									address: { type: "string" },
									phone: { type: "string" },
									work_time: { type: "string" },
								},
							},
						},
					},
				},
				responses: {
					201: { description: "Yeni filial yarandı" },
					400: { description: "Yanlış və ya əskik məlumat" },
				},
			},
		},
		"/api/v1/branch/all": {
			get: {
				summary: "Bütün filialları gör",
				tags: ["Filial"],
				responses: {
					500: { description: "Server error" },
				},
			},
		},
		"/api/v1/branch/delete/{id}": {
			delete: {
				summary: "Fİlialı sil",
				tags: ["Filial"],
				security: [
					{
						bearerAuth: [],
					},
				],
				parameters: [
					{
						name: "id",
						in: "path",
						required: true,
						description: "Silinəcək filialın ID-si",
						schema: {
							type: "string",
							example: "12345",
						},
					},
				],
				responses: {
					200: { description: "Xəbər silindi" },
					404: { description: "Xəbər tapılmadı" },
				},
			},
		},
		"/api/v1/branch/update/{id}": {
			put: {
				summary: "Filalı yenilə",
				tags: ["Filial"],
				security: [
					{
						bearerAuth: [],
					},
				],
				parameters: [
					{
						name: "id",
						in: "path",
						required: true,
						description: "Yeniləcək filialın ID-si",
						schema: {
							type: "string",
							example: "12345",
						},
					},
				],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									address: { type: "string" },
									phone: { type: "string" },
									work_time: { type: "string" },
								},
							},
						},
					},
				},
				responses: {
					200: { description: "Filial yeniləndi" },
					404: { description: "Filial tapılmadı" },
					409: { description: "Filial artıq mövcuddur" },
				},
			},
		},
		"/api/v1/order/create": {
			post: {
				summary: "Sifariş yaratmaq",
				tags: ["Sifariş"],
				security: [
					{
						bearerAuth: [],
					},
				],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									address: { type: "string" },
									phone: { type: "string" },
									region: { type: "string" },
									time: { type: "string" },
								},
							},
						},
					},
				},
				responses: {
					201: { description: "Yeni sifariş yarandı" },
					400: { description: "Yanlış və ya əskik məlumat" },
				},
			},
		},
		"/api/v1/order/all": {
			get: {
				summary: "Bütün sifarişləri gör",
				tags: ["Sifariş"],
				security: [
					{
						bearerAuth: [],
					},
				],
				responses: {
					500: { description: "Server error" },
				},
			},
		},
		"/api/v1/order/delete/{id}": {
			delete: {
				summary: "Sifarişi sil",
				tags: ["Sifariş"],
				security: [
					{
						bearerAuth: [],
					},
				],
				parameters: [
					{
						name: "id",
						in: "path",
						required: true,
						description: "Silinəcək sifarişin ID-si",
						schema: {
							type: "string",
							example: "12345",
						},
					},
				],
				responses: {
					200: { description: "Sifariş silindi" },
					404: { description: "Sifariş tapılmadı" },
				},
			},
		},
		"/api/v1/order/update/{id}": {
			put: {
				summary: "Sifariş yenilə",
				tags: ["Sifariş"],
				security: [
					{
						bearerAuth: [],
					},
				],
				parameters: [
					{
						name: "id",
						in: "path",
						required: true,
						description: "Yeniləcək sifarişin ID-si",
						schema: {
							type: "string",
							example: "12345",
						},
					},
				],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									address: { type: "string" },
									phone: { type: "string" },
									region: { type: "string" },
									time: { type: "string" },
								},
							},
						},
					},
				},
				responses: {
					200: { description: "Sifariş yeniləndi" },
					404: { description: "Sifariş tapılmadı" },
					409: { description: "Sifariş artıq mövcuddur" },
				},
			},
		},
		"/api/v1/site/create": {
			post: {
				summary: "Sayt nümunələri yaratmaq",
				tags: ["Sayt nümunəsi"],
				security: [
					{
						bearerAuth: [],
					},
				],
				requestBody: {
					required: true,
					content: {
						"multipart/form-data": {
							schema: {
								type: "object",
								properties: {
									link: { type: "string" },
									img: { type: "string", format: "binary" },
								},
							},
						},
					},
				},
				responses: {
					201: { description: "Yeni sayt nümunəsi yarandı" },
					400: { description: "Yanlış və ya əskik məlumat" },
				},
			},
		},
		"/api/v1/site/all": {
			get: {
				summary: "Bütün sayt nümunələrini gör",
				tags: ["Sayt nümunəsi"],
				responses: {
					500: { description: "Server error" },
				},
			},
		},
		"/api/v1/site/delete/{id}": {
			delete: {
				summary: "Sayt nümunəsini sil",
				tags: ["Sayt nümunəsi"],
				security: [
					{
						bearerAuth: [],
					},
				],
				parameters: [
					{
						name: "id",
						in: "path",
						required: true,
						description: "Silinəcək sayt nümunəsinin ID-si",
						schema: {
							type: "string",
							example: "12345",
						},
					},
				],
				responses: {
					200: { description: "Sayt nümunələri silindi" },
					404: { description: "Sayt nümunələri tapılmadı" },
				},
			},
		},
		"/api/v1/site/update/{id}": {
			put: {
				summary: "Sayt nümunələri yenilə",
				tags: ["Sayt nümunəsi"],
				security: [
					{
						bearerAuth: [],
					},
				],
				parameters: [
					{
						name: "id",
						in: "path",
						required: true,
						description: "Yeniləcək sayt nümunəsinin ID-si",
						schema: {
							type: "string",
							example: "12345",
						},
					},
				],
				requestBody: {
					required: true,
					content: {
						"multipart/form-data": {
							schema: {
								type: "object",
								properties: {
									link: { type: "string" },
									img: { type: "string", format: "binary" },
								},
							},
						},
					},
				},
				responses: {
					200: { description: "Sayt nümunələri yeniləndi" },
					404: { description: "Sayt nümunələri tapılmadı" },
					409: { description: "Sayt nümunələri artıq mövcuddur" },
				},
			},
		},
		"/api/v1/recipe/create": {
			post: {
				summary: "Tarif yaratmaq",
				tags: ["Tarif"],
				security: [
					{
						bearerAuth: [],
					},
				],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									country: { type: "string" },
									currency: { type: "string" },
									weight: { type: "string" },
									price_manat: { type: "string" },
									price_foreign: { type: "string" },
								},
							},
						},
					},
				},
				responses: {
					201: { description: "Yeni tarif yarandı" },
					400: { description: "Yanlış və ya əskik məlumat" },
				},
			},
		},
		"/api/v1/recipe/all": {
			get: {
				summary: "Bütün tarifləri gör",
				tags: ["Tarif"],
				responses: {
					500: { description: "Server error" },
				},
			},
		},
		"/api/v1/recipe/delete/{id}": {
			delete: {
				summary: "Tarifi sil",
				tags: ["Tarif"],
				security: [
					{
						bearerAuth: [],
					},
				],
				parameters: [
					{
						name: "id",
						in: "path",
						required: true,
						description: "Silinəcək tarifin ID-si",
						schema: {
							type: "string",
							example: "12345",
						},
					},
				],
				responses: {
					200: { description: "Tarif silindi" },
					404: { description: "Tarif tapılmadı" },
				},
			},
		},
		"/api/v1/recipe/update/{id}": {
			put: {
				summary: "Tarifi yenilə",
				tags: ["Tarif"],
				security: [
					{
						bearerAuth: [],
					},
				],
				parameters: [
					{
						name: "id",
						in: "path",
						required: true,
						description: "Yeniləcək tarifin ID-si",
						schema: {
							type: "string",
							example: "12345",
						},
					},
				],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									country: { type: "string" },
									currency: { type: "string" },
									weight: { type: "string" },
									price_manat: { type: "string" },
									price_foreign: { type: "string" },
								},
							},
						},
					},
				},
				responses: {
					200: { description: "Tarif yeniləndi" },
					404: { description: "Tarif tapılmadı" },
					409: { description: "Tarif artıq mövcuddur" },
				},
			},
		},
	},
	components: {
		securitySchemes: {
			bearerAuth: {
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
			},
		},
	},
};
