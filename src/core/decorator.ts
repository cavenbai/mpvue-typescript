import "reflect-metadata";
import { createDecorator } from 'vue-class-component'
import injector from 'vue-inject';

/**
 * 组件内依赖注入
 * @param target
 */
export function Dependencies(target?: any) {
  return createDecorator((componentOptions, key) => {
    if (!injector.$$factories[key] && target) {
      injector.service(key, target);
    }
    if (typeof componentOptions['dependencies'] === 'undefined') {
      componentOptions['dependencies'] = []
    }
    if (Array.isArray(componentOptions['dependencies'])) {
      componentOptions['dependencies'].push(key)
    }
  })
}

/**
 * 直接依赖注入
 */
export function Inject(target?): PropertyDecorator {
  return function (container, key) {
    if (!injector.$$factories[key] && target) {
      injector.service(key, target).lift;
    }

    try {
      container[key] = injector.get(key);
    }
    catch (ex) {
      console.warn(ex)
    }
  }
}

