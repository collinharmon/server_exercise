import "core-js/stable";
import "regenerator-runtime/runtime";
const request = require('supertest')
import app from '../app.js'

describe('Post Endpoints', () => {

  it('gets MCA Address: 224.0.0.0', async () => {
    const res = await request(app)
      .get("/")
      expect(res.body.address).toBe("224.0.0.0")
  })

  it('gets MCA Address: 224.0.0.1', async () => {
    const res = await request(app)
      .get("/")
      expect(res.body.address).toBe("224.0.0.1")
  })

  it('gets MCA Address: 224.0.0.2', async () => {
    const res = await request(app)
      .get("/")
      expect(res.body.address).toBe("224.0.0.2")
  })

  it('Deletes MCA Address: 224.0.0.1', async () => {
    const res = await request(app)
      .delete("/")
      .send({
        mca: "224.0.0.1"
      })
      expect(res.statusCode).toBe(200)
  })


  it('Deletes MCA Address: 224.0.0.0', async () => {
    const res = await request(app)
      .delete("/")
      .send({
        mca: "224.0.0.0"
      })
      expect(res.statusCode).toBe(200)
  })

  it('gets MCA Address: 224.0.0.0 after its release', async () => {
    const res = await request(app)
      .get("/")
      expect(res.body.address).toBe("224.0.0.0")
  })

  it('gets MCA Address: 224.0.0.1 after its release', async () => {
    const res = await request(app)
      .get("/")
      expect(res.body.address).toBe("224.0.0.1")
  })

})
