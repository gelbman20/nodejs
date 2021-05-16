const { v4 } = require('uuid')
const fs = require('fs')
const path = require('path')

class Course {
  constructor(title, price, image) {
    this.title = title
    this.price = price
    this.image = image
    this.id = v4()
  }

  toJSON () {
    return {
      id: this.id,
      title: this.title,
      price: this.price,
      image: this.image
    }
  }

  async save () {
    const courses = await Course.getAll()
    courses.push(this.toJSON())

    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname,  '..', 'data', 'courses.json'), JSON.stringify(courses), (err) => {
        if (err) {
          throw reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  static async update (course) {
    const courses = await Course.getAll()
    const index = courses.findIndex(c => c.id === course.id)
    courses[index] = course

    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname,  '..', 'data', 'courses.json'), JSON.stringify(courses), (err) => {
        if (err) {
          throw reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  static getAll () {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname,  '..', 'data', 'courses.json'),
        'utf-8',
        (err, content) => {
          if (err) {
            reject( err)
          } else {
            resolve(JSON.parse(content))
          }
        }
      )
    })
  }

  static async getOne (id) {
    const courses = await Course.getAll()
    return courses.find(course => course.id === id)
  }
}

module.exports = Course