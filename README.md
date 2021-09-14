### Rest API Absen

1. Register Pegawai / Supervisor
   endpoint: /api/user/register

method: **POST**

request body:
if pegawai register

```
{
	"nama": "pegawai 4",
	"email": "pegawai4@gmail.com",
	"npp": "114",
	"npp_supervisor": "121",
	"password": "pegawai4"
}
```

if supervisor register

```
{
	"nama": "pegawai 4",
	"email": "pegawai4@gmail.com",
	"npp": "114",
	"password": "pegawai4"
}
```

response status: **201**

response:

```
{
  "success": true,
  "message": "success create user",
  "users": {
    "id": 6
  }
}
```

2. Login pegawai / supervisor
   endpoint: /api/login

method: **POST**

request body:

```
{
	"email": "supervisor1@gmail.com",
	"password": "supervisor1"
}
```

response status: **200**

response:

```
{
  "success": true,
  "message": "success login",
  "token": "token"
}
```

3. absent
   endpoint: /api/epresence

method: **POST**

request header: bearer token

request body:

```
{
	"type": "IN"
}
```

```
{
	"type": "OUT"
}
```

response status: **201**

response:

```
{
  "success": true,
  "message": "absent success"
}
```

4. get all absent
   endpoint: /api/epresences

method: **GET**

request header: bearer token

response status: **200**

response:

```
{
  "success": true,
  "message": "success get absen data",
  "data": [
    {
      "id_user": 4,
      "nama_user": "pegawai 3",
      "tanggal": "14-9-2021",
      "waktu_masuk": "18:26:00",
      "waktu_pulang": "18:25:08",
      "status_masuk": "PENDING",
      "status_pulang": "PENDING"
    },
    {
      "id_user": 1,
      "nama_user": "pegawai 1",
      "tanggal": "14-9-2021",
      "waktu_masuk": "18:24:59",
      "waktu_pulang": "18:25:15",
      "status_masuk": "APPROVE",
      "status_pulang": "PENDING"
    },
    {
      "id_user": 3,
      "nama_user": "pegawai 2",
      "tanggal": "14-9-2021",
      "waktu_masuk": "18:25:04",
      "waktu_pulang": "18:25:55",
      "status_masuk": "APPROVE",
      "status_pulang": "REJECT"
    },
    {
      "id_user": 6,
      "nama_user": "pegawai 4",
      "tanggal": "14-9-2021",
      "waktu_masuk": "19:52:54",
      "waktu_pulang": "-",
      "status_masuk": "PENDING",
      "status_pulang": "-"
    }
  ]
}
```

5. approve absen (only supervisor)

endpoint: /api/epresence/:id

method: **PATCH**

request header: bearer token

request body:

```
{
	"is_approve": true
}
```

```
{
	"is_approve": false
}
```

response status: **200**

response:

```
{
  "success": true,
  "message": "success update status absent user (id user)"
}
```
