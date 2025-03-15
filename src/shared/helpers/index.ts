import { LeafletLocale } from "../types/ZonesEditor";

export const mockDelay = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));

export const drawLocal = (leaflet: LeafletLocale) => {
    leaflet.drawLocal = {
        draw: {
            toolbar: {
                actions: {
                    title: 'Отменить отрисовку',
                    text: 'Отменить'
                },
                finish: {
                    title: 'Завершить отрисовку',
                    text: 'Завершить'
                },
                undo: {
                    title: 'Удаляет последнюю точку',
                    text: 'Удалить последнюю точку'
                },
                buttons: {
                    polyline: '1 - your text-',
                    polygon: 'Рисовать многоугольник',
                    rectangle: '2 - your text-',
                    circle: '3 - your text-',
                    marker: '4 - your text-',
                    circlemarker: '5 - your text-'
                }
            },
            handlers: {
                circle: {
                    tooltip: {
                        start: '6 - your text-'
                    },
                    radius: '7 - your text-'
                },
                circlemarker: {
                    tooltip: {
                        start: '8 - your text-.'
                    }
                },
                marker: {
                    tooltip: {
                        start: '9 - your text-.'
                    }
                },
                polygon: {
                    tooltip: {
                        start: 'Кликните для начала создания полигона',
                        cont: 'Кликните для продолжения создания полигона',
                        end: 'Кликните для завершения создания полигона'
                    }
                },
                polyline: {
                    error: '<strong>Error:</strong> shape edges cannot cross!',
                    tooltip: {
                        start: 'Click to start drawing line.',
                        cont: 'Click to continue drawing line.',
                        end: 'Click last point to finish line.'
                    }
                },
                rectangle: {
                    tooltip: {
                        start: '10 - your text-.'
                    }
                },
                simpleshape: {
                    tooltip: {
                        end: 'Release mouse to finish drawing.'
                    }
                }
            }
        },
        edit: {
            toolbar: {
                actions: {
                    save: {
                        title: 'Сохранить изменения',
                        text: 'Сохранить'
                    },
                    cancel: {
                        title: 'Отмена редактирования, отменяет все изменения',
                        text: 'Отменить'
                    },
                    clearAll: {
                        title: 'Очистите все слои',
                        text: 'Очистить всё'
                    }
                },
                buttons: {
                    edit: 'Редактирование слоёв',
                    editDisabled: 'Нет слоев для редактирования',
                    remove: 'Удаление слоёв',
                    removeDisabled: 'Нет слоев для удаления'
                }
            },
            handlers: {
                edit: {
                    tooltip: {
                        text: 'Перетаскивайте маркеры для редактирования объектов',
                        subtext: 'Нажмите кнопку отмена, чтобы отменить изменения'
                    }
                },
                remove: {
                    tooltip: {
                        text: 'Нажмите на элемент, который нужно удалить'
                    }
                }
            }
        }
    };
}