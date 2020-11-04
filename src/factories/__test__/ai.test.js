import AI from '../AI';

test('AI randomAttack returns an array of length 2', () => {
    const newAI = AI();
    expect(newAI.randomAttack().length).toBe(2);
})

test('AI randomAttack returns numbers between 0 and 9', () => {
    const newAI = AI();
    expect(newAI.randomAttack()[0] <= 9 && newAI.randomAttack()[0] >= 0).toBeTruthy();
    expect(newAI.randomAttack()[1] <= 9 && newAI.randomAttack()[1] >= 0).toBeTruthy()
})

test('AI randomAttack doesnt attack the same place twice', () => {
    const newAI = AI();
    const alreadyAttacked=[];
    for(let i=0; i<100;i++){
        alreadyAttacked.push(newAI.randomAttack())
    }
    expect(alreadyAttacked.every((e, i, a) => a.indexOf(e) === i)).toBe(true)
})

test('AI turn starts by default on false', () => {
    const newAI = AI();
    expect(newAI.turn).toBe(false)
})

test('getGameboard returns the passed parameter', () => {
    const newAI = AI([0,1,3,4,5]);
    expect(newAI.getGameboard()).toStrictEqual([0,1,3,4,5])
})


test('getName returns "AI"', () => {
    const newAI = AI();
    expect(newAI.getName()).toBe('AI')
})
