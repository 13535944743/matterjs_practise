var Example = Example || {};

Example.airFriction = function() {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Composite = Matter.Composite,
        Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 800,
            height: 600,
            showVelocity: true
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    Composite.add(world, [
        // falling blocks
        Bodies.rectangle(200, 100, 60, 60, { frictionAir: 0.001 }),
        Bodies.rectangle(400, 100, 60, 60, { frictionAir: 0.05 }),
        Bodies.rectangle(600, 100, 60, 60, { frictionAir: 0.1 }),

        // walls
        Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
        Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
        Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
        Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
    ]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });

    // context for MatterTools.Demo
    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
};

Example.airFriction.title = 'Air Friction';
Example.airFriction.for = '>=0.14.2';

if (typeof module !== 'undefined') {
    module.exports = Example.airFriction;
}



// const Matter = require('matter-js');

// var Example = Example || {};

// // 把选中的区域缩放到画布上
// // Render.lookAt(render, {
// //         // x: 400,
// //         // y: 300
// //         min: { x: -10, y: -20 },
// //         max: { x: 800, y: 680 }
// //     });

// Example.airFriction = function() {
//     var Engine = Matter.Engine,
//         Render = Matter.Render,
//         Runner = Matter.Runner,
//         MouseConstraint = Matter.MouseConstraint,
//         Mouse = Matter.Mouse,
//         Composite = Matter.Composite,
//         Bodies = Matter.Bodies;

//     // create engine
//     var engine = Engine.create(),
//         world = engine.world;

//     // create renderer
//     var render = Render.create({       // 创建渲染器，可通过options来设置画布大小等操作
//         element: document.body,
//         engine: engine,
//         options: {
//             width: 1024,
//             height: 720,
//             // wireframes: false,
//             // showAngleIndicator: true,
//             // showCollisions: true,
//             // showIds: true,
//             showVelocity: true      // 是否显示速度变量
//         }
//     });

//     Render.run(render);

//     // create runner
//     var runner = Runner.create();
//     Runner.run(runner, engine);

//     // add bodies
//     Composite.add(world, [
//         // falling blocks
//         Bodies.rectangle(200, 100, 60, 60, { frictionAir: 0.001 }),
//         Bodies.rectangle(400, 100, 60, 60, { frictionAir: 0.05 }),
//         Bodies.rectangle(600, 100, 60, 60, { frictionAir: 0 }),

//         // walls
//         Bodies.rectangle(400, 25, 800, 50, { isStatic: true }),
//         Bodies.rectangle(400, 625, 800, 50, { isStatic: true }),
//         Bodies.rectangle(775, 325, 50, 550, { isStatic: true }),
//         Bodies.rectangle(25, 325, 50, 550, { isStatic: true })
//     ]);

//     // add mouse control
//     var mouse = Mouse.create(render.canvas),
//         mouseConstraint = MouseConstraint.create(engine, {
//             mouse: mouse,
//             constraint: {
//                 stiffness: 0.2,
//                 render: {
//                     visible: false
//                 }
//             }
//         });

//     Composite.add(world, mouseConstraint);

//     // keep the mouse in sync with rendering
//     render.mouse = mouse;

//     // fit the render viewport to the scene
//     Render.lookAt(render, {
//         // x: 400,
//         // y: 300
//         min: { x: -10, y: -20 },
//         max: { x: 800, y: 680 }
//     });

//     // context for MatterTools.Demo
//     return {
//         engine: engine,
//         runner: runner,
//         render: render,
//         canvas: render.canvas,
//         stop: function() {
//             Matter.Render.stop(render);
//             Matter.Runner.stop(runner);
//         }
//     };
// };

// // Example.airFriction.title = 'Air Friction';
// // Example.airFriction.for = '>=0.14.2';

// // if (typeof module !== 'undefined') {
// //     module.exports = Example.airFriction;
// // }

// debugger;
// const context = Example.airFriction();
// console.log(context);
// // context.stop();