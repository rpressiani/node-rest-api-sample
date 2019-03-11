import { expect } from "chai"

describe("index test", () => {
    describe("hello world", () => {
        it("should say Hello guys!", () => {

            const sayHello = _ => "Hello guys!"
            const str = sayHello();
            expect(str).to.equal("Hello guys!")
        })
    })
})