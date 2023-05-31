var Example = Example || {};

Example.avalanche = function() {
    try {
        if (typeof MatterWrap !== 'undefined') {
            // either use by name from plugin registry (Browser global)
            Matter.use('matter-wrap');
        } else {
            // or require and use the plugin directly (Node.js, Webpack etc.)
            Matter.use(require('matter-wrap'));
        }
    } catch (e) {
        // could not require the plugin or install needed
    }
    
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composite = Matter.Composite,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
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
            showAngleIndicator: true
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    var stack = Composites.stack(20, 20, 20, 5, 0, 0, function(x, y) {
        return Bodies.circle(x, y, Common.random(10, 20), { friction: 0.00001, restitution: 0.5, density: 0.001 });
    });

    Composite.add(world, stack);
    
    Composite.add(world, [
        Bodies.rectangle(200, 150, 700, 20, { isStatic: true, angle: Math.PI * 0.06, render: { fillStyle: '#060a19' } }),
        Bodies.rectangle(500, 350, 700, 20, { isStatic: true, angle: -Math.PI * 0.06, render: { fillStyle: '#060a19' } }),
        Bodies.rectangle(340, 580, 700, 20, { isStatic: true, angle: Math.PI * 0.04, render: { fillStyle: '#060a19' } })
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
    Render.lookAt(render, Composite.allBodies(world));

    // wrapping using matter-wrap plugin
    for (var i = 0; i < stack.bodies.length; i += 1) {
        stack.bodies[i].plugin.wrap = {
            min: { x: render.bounds.min.x, y: render.bounds.min.y },
            max: { x: render.bounds.max.x, y: render.bounds.max.y }
        };
    }

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

Example.avalanche.title = 'Avalanche';
Example.avalanche.for = '>=0.14.2';

if (typeof module !== 'undefined') {
    module.exports = Example.avalanche;
}

// // 1. 使用插件
// // 2. 批量生成小球

// const Matter = require('matter-js');

// var Example = Example || {};

// Example.avalanche = function() {
//     try {
//         if (typeof MatterWrap !== 'undefined') {
//             // either use by name from plugin registry (Browser global)
//             Matter.use('matter-wrap');
//         } else {
//             // or require and use the plugin directly (Node.js, Webpack etc.)
//             Matter.use(require('matter-wrap'));
//         }
//     } catch (e) {
//         // could not require the plugin or install needed
//     }
    
//     var Engine = Matter.Engine,
//         Render = Matter.Render,
//         Runner = Matter.Runner,
//         Composite = Matter.Composite,
//         Composites = Matter.Composites,
//         Common = Matter.Common,
//         MouseConstraint = Matter.MouseConstraint,
//         Mouse = Matter.Mouse,
//         Bodies = Matter.Bodies;

//     // create engine
//     var engine = Engine.create(),
//         world = engine.world;

//     // create renderer
//     var render = Render.create({
//         element: document.body,
//         engine: engine,
//         options: {
//             width: 800,
//             height: 600,
//             wireframes: false,
//             showAngleIndicator: true
//         }
//     });

//     Render.run(render);

//     // create runner
//     var runner = Runner.create();
//     Runner.run(runner, engine);

//     // add bodies
//     // x，y
//     // 2表示2行，20表示1行20个，Composites.stack生成的主体不会重叠
//     // columnGap，rowGap：行列间隙
//     var stack = Composites.stack(20, 20, 20, 2, 10, 20, function (x, y) {
//         // friction：摩擦系数
//         // restitution 是 Matter.js 中用于定义刚体恢复系数的选项。它表示两个刚体在碰撞后恢复原来状态的能力，可以是一个介于 0 和 1 之间的浮点数。默认情况下，它的值为 0，表示刚体之间没有弹性。
//         // 当两个刚体碰撞时，restitution 决定了它们之间的反弹程度。例如，如果一个刚体的 restitution 值为 0.8，另一个刚体的值为 0.5，则碰撞后第一个刚体会弹回更高的高度，而第二个刚体则会弹回较低的高度。
//         // density 是 Matter.js 中用于定义刚体密度的选项。它表示刚体的质量与体积之比，可以是一个大于 0 的浮点数
//         return Bodies.circle(x, y, Common.random(10, 20), { friction: 0.00001, restitution: 0.5, density: 0.0001 });
//     });

//     Composite.add(world, stack);
    
//     Composite.add(world, [
//         Bodies.rectangle(200, 150, 700, 20, { isStatic: true, angle: Math.PI * 0.06, render: { fillStyle: 'pink' } }),
//         Bodies.rectangle(500, 350, 700, 20, { isStatic: true, angle: -Math.PI * 0.06, render: { fillStyle: 'purple' } }),
//         Bodies.rectangle(340, 580, 700, 20, { isStatic: true, angle: Math.PI * 0.04, render: { fillStyle: 'skyblue' } })
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
//     Render.lookAt(render, Composite.allBodies(world));

//     // wrapping using matter-wrap plugin
//     for (var i = 0; i < stack.bodies.length; i += 1) {
//         stack.bodies[i].plugin.wrap = {
//             min: { x: render.bounds.min.x, y: render.bounds.min.y },
//             max: { x: render.bounds.max.x, y: render.bounds.max.y }
//         };
//     }

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

// Example.avalanche();