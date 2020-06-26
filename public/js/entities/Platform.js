import Entity from '../Entity.js';
import Trait from '../Trait.js';
import {loadSpriteSheet} from '../loaders/sprite.js';

export function loadPlatform() {
    return loadSpriteSheet('platform')
    .then(createPlatformFactory);
}

class Behavior extends Trait {
    constructor() {
        super();
    }

    collides(us, them) {
    }
}

class SineWave extends Trait {
    constructor() {
        super();
        this.speed = 1;
        this.startPos = null;
    }

    update(entity, gameContext, level) {
        if(this.startPos === null) {
            this.startPos = entity.pos[entity.props.axis];
        }
        entity.pos[entity.props.axis] = this.startPos + entity.props.distance / 2 * Math.sin(entity.lifetime * this.speed);
    }
}

function createPlatformFactory(sprite) {
    function drawPlatform(context, entity) {
        const size = 6;
        for (let i = 0; i < size; i++) {
            sprite.draw('beam', context, i * 8, 0);
        }
    }

    return function createPlatform(props) {
        const entity = new Entity();
        entity.size.set(48, 8);
        entity.props = props;

        entity.addTrait(new Behavior());
        entity.addTrait(new SineWave());

        entity.draw = drawPlatform;

        return entity;
    };
}
