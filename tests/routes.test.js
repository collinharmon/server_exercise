import "core-js/stable";
import "regenerator-runtime/runtime";
const request = require('supertest')
import app from '../app.js'

describe('Post Endpoints', () => {

  it('should get', async () => {
    const res = await request(app)
      .get("/")
      expect(res.body.address).toBe("224.0.0.0")
  })

  it('should get', async () => {
    const res = await request(app)
      .get("/")
      expect(res.body.address).toBe("224.0.0.1")
  })

  it('should get', async () => {
    const res = await request(app)
      .get("/")
      expect(res.body.address).toBe("224.0.0.2")
  })

  it('test delete', async () => {
    const res = await request(app)
      .delete("/")
      .send({
        mca: "224.0.0.1"
      })
      expect(res.statusCode).toBe(200)
  })


  it('test delete', async () => {
    const res = await request(app)
      .delete("/")
      .send({
        mca: "224.0.0.0"
      })
      expect(res.statusCode).toBe(200)
  })

  it('should get', async () => {
    const res = await request(app)
      .get("/")
      expect(res.body.address).toBe("224.0.0.0")
  })

  it('should get', async () => {
    const res = await request(app)
      .get("/")
      expect(res.body.address).toBe("224.0.0.1")
  })

})
