import React, { useState } from 'react';
import styles from './Classifier.module.css';
import Layout from '../../Layout/Layout';
import { Select, Input, Button } from 'antd';

const { Option } = Select;

const featuresData = {
    'Один признак': {
        'Линии': {
            'Ретикулярные': {
                '1 цвет': {
                    'Коричневые, тонкие или толстые линии': {'Себорейный кератоз': {}, 'Меланоцитарный невус': {}},
                    'Чёрные': {'Простое лентиго': {}, 'Меланоцитарный невус': {}},
                },
                '>1 цвета': {
                    'Центральная гиперпигментация': {'Меланоцитарный невус': {}},
                    'Пестрый или краповый': {'Меланоцитарный невус': {}, 'Меланома': {}},
                    'Периферическая гиперпигментация': {'Меланоцитарный невус': {}, 'Меланома': {}},
                },
            },
            'Разветвленные': {
                'Коричневые': {'Меланоцитарный невус': {}},
                'Чёрные': {'Простое лентиго': {}},
            },
            'Параллельные': {
                'Гребешки': {
                    'Меланин': {'Меланома': {}, 'Меланоцитарный невус': {}},
                    'Другой пигмент': {'Кровотечение': {}, 'Экзогенный пигмент': {}},
                },
                'Борозды': {'Меланоцитарный невус': {}},
                'Пересекающиеся гребешки и борозды': {'Меланоцитарный невус': {}},
            },
            'Изогнутые': {'Себорейный кератоз': {}},
        },
        'Псевдоподии': {
            'Периферические': {'Меланоцитарный невус': {}},
            'Сегментарные': {'Меланома': {}},
        },
        'Круги': {
            'Только коричневые круги': {'Себорейный кератоз': {}, 'Меланоцитарный невус': {}},
            'Некоторые круги серые или чёрные': {'Меланома': {}, 'Себорейный кератоз': {}, 'Актинический кератоз (предрак)': {}},
        },
        'Глыбки': {
            '1 цвет': {
                'Красный или пурпурный': {'Гемангиома, кровоизлияние (в том числе пурпура)': {}},
                'Оранжевый': {'Себорейный кератоз': {}, 'Базальноклеточная карцинома': {}},
                'Желтый/белый': {'Себорейный кератоз': {}, 'Гиперплазия сальных желез': {}},
                'Телесный': {'Меланоцитарный невус': {}, 'Себорейный кератоз': {}},
                'Коричневый': {'Меланоцитарный невус': {}},
                'Черный': {'Гемангиома, тромбоз, геморрагия': {}},
                'Голубой': {'Базальноклеточная карцинома': {}},
            },
            '>1 цвета': {
                'Другой пигмент': {
                    'Преобладают белые, желтые или оранжевые глыбки': {'Себорейный кератоз': {}, 'Меланоцитарный невус': {}},
                    'Преобладают красные или сине-красные глыбки': {'Гемангиома': {}},
                },
                'Меланин': {
                    'Цвета расположены симметрично': {'Меланоцитарный невус': {}},
                    'Цвета расположены асимметрично': {'Меланоцитарный невус': {}, 'Базальноклеточная карцинома': {}, 'Меланома': {}},
                },
            },
        },
        'Точки': {
            'Серые точки': {'Себорейный кератоз (в форме доброкачественного лихеноидного кератоза)': {}, 'Актинический кератоз (предрак)': {}, 'Болезнь Боуэна (предрак)': {}, 'Меланома': {}},
            'Коричневые точки': {'Меланоцитарный невус': {}, 'Себорейный кератоз (в форме солнечного лентиго)': {}, 'Болезнь Боуэна (предрак)': {}},
        },
        'Бесструктурная область': {
            '1 цвет': {
                'Черный': {'Кровоизлияние': {}, 'Тромбированная гемангиома': {}, 'Меланоцитарный невус': {}, 'Меланома': {}},
                'Синий': {'Меланоцитарный невус': {}, 'Меланома': {}},
                'Коричневый': {'Себорейный кератоз': {}, 'Болезнь Боуэна (предрак)': {}, 'Меланоцитарный невус': {}},
                'Красный': {'Кровоизлияние': {}},
            },
            '>1 цвета': {
                'Преимущественно желтый или оранжевый': {'Базальноклеточная карцинома': {}, 'Себорейный кератоз': {}},
                'Преимущественно красный или черный': {'Кровоизлияние': {}},
                'Сочетания коричневого, синего, серого, черного': {
                    'Симметричная окраска': {'Меланоцитарный невус': {}},
                    'Несимметричная окраска': {'Меланома': {}, 'Болезнь Боуэна (предрак)': {}, 'Себорейный кератоз': {}, 'Базальноклеточная карцинома': {}, 'Дерматофиброма': {}},
                },
            },
        },
    },
    'Несколько признаков': {
        'Линии': {
            'Ретикулярные или разветвленные': {
                'Симметричные структуры': {'Меланоцитарный невус': {}},
                'Ассиметричные узоры': {
                    '1 цвет, коричневый': {'Меланоцитарный невус': {}},
                    '>1 цвета': {'Меланома': {}, 'Меланоцитарный невус': {}},
                },
            },
            'Параллельные': {
                'Гребешки': {
                    'Другой пигмент': {'Кровоизлияние': {}, 'Экзогенный пигмент': {}},
                    'Меланин': {
                        '1 цвет, коричневый': {'Меланома': {}, 'Меланоцитарный невус': {}, 'Простое лентиго': {}},
                        '>1 цвета': {'Меланома': {}},
                    },
                },
                'Борозды или пересекающие борозды и гребешки': {
                    'Симметричный': {'Меланоцитарный невус': {}},
                    'Асимметричный': {'Меланоцитарный невус': {}, 'Меланома': {}},
                },
            },
            'Радиальные': {
                'По краям': {
                    'Периферические': {
                        'Белый или светло-коричневый центр': {'Дерматофиброма': {}},
                        'Черный, коричневый или синий центр': {'Меланоцитарный невус': {}},
                    },
                    'Сегментарные': {'Меланома': {}, 'Базальноклеточная карцинома': {}},
                },
                'По центру': {'Базальноклеточная карцинома': {}},
            },
            'Изогнутые': {'Себорейный кератоз': {}, 'Меланоцитарный невус': {}, 'Меланома': {}},
        },
        'Псевдоподии': {
            'Периферические': {'Меланоцитарный невус': {}},
            'Сегментарные': {'Меланома': {}},
        },
        'Круги': {
            'Коричневые': {'Себорейный кератоз': {}, 'Меланоцитарный невус': {}},
            'Частично серые или чёрные': {'Меланома': {}, 'Себорейный кератоз': {}, 'Актинический кератоз (предрак)': {}},
        },
        'Глыбки': {
            'Симметричные узоры': {'Меланоцитарный невус': {}},
            'Ассиметричные узоры': {
                'Другой пигмент': {
                    'Жёлтый или белый': {'Себорейный кератоз': {}},
                    'Оранжевый': {'Базальноклеточная карцинома': {}, 'Себорейный кератоз': {}},
                    'Красный или пурпурный': {'Гемангиома': {}, 'Меланома': {}},
                },
                'Меланин': {
                    '1 цвет (коричневый)': {'Меланоцитарный невус': {}},
                    '>1 цвета': {'Базальноклеточная карцинома': {}, 'Меланома': {}, 'Себорейный кератоз': {}},
                },
            },
        },
        'Точки': {
            'Серые': {'Себорейный кератоз': {}, 'Актинический кератоз (предрак)': {}, 'Болезнь Боуэна (предрак)': {}, 'Меланома': {}, 'Базальноклеточная карцинома': {}},
            'Синии': {'Базальноклеточная карцинома': {}},
            'Черные': {'Меланома': {}, 'Меланоцитарный невус': {}},
            'Коричневые': {'Меланоцитарный невус': {}, 'Себорейный кератоз': {}, 'Болезнь Боуэна (предрак)': {}},
        },
    },
};


function FeatureSelector({ data, onSelect, depth, selectedFeatures }) {
    const [selectedFeature, setSelectedFeature] = useState(null);

    const handleFeatureChange = (value) => {
        setSelectedFeature(value);
        onSelect(depth, value);
    };

    const isLeafNode = Array.isArray(data);

    return (
        <div className={styles.featureSelector}>
            {isLeafNode ? (
                <Select
                    style={{ width: 200 }}
                    placeholder="Выберите диагноз"
                    onChange={(value) => onSelect(depth, value)}
                >
                    {data.map((diagnosis, index) => (
                        <Option key={index} value={diagnosis}>
                            {diagnosis}
                        </Option>
                    ))}
                </Select>
            ) : (
                <div>
                    <Select
                        style={{ width: 200 }}
                        placeholder="Выберите признак"
                        onChange={handleFeatureChange}
                    >
                        {Object.keys(data).map((feature) => (
                            <Option key={feature} value={feature}>
                                {feature}
                            </Option>
                        ))}
                    </Select>
                    {selectedFeature && data[selectedFeature] && !isEmpty(data[selectedFeature]) && (
                        <FeatureSelector
                            data={data[selectedFeature]}
                            onSelect={onSelect}
                            depth={depth + 1}
                            selectedFeatures={selectedFeatures}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

// Вспомогательная функция для проверки объекта на пустоту
function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
    }
    return true;
}

function Classifier() {
    const [selectedFeatures, setSelectedFeatures] = useState(new Array(4).fill(null));
    const [selectedImage, setSelectedImage] = useState(null);

    const handleFeatureSelect = (depth, value) => {
        // Обработка выбора параметра
        const updatedSelectedFeatures = selectedFeatures.slice(0, depth);
        updatedSelectedFeatures[depth] = value;
        setSelectedFeatures(updatedSelectedFeatures);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setSelectedImage(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleFeatureRemove = (depth) => {
        const updatedSelectedFeatures = selectedFeatures.slice(0, depth);
        updatedSelectedFeatures[depth] = null;
        setSelectedFeatures(updatedSelectedFeatures);
    };

    const sendSelectedFeaturesToServer = () => {
        const selectedFeaturesData = {
            selectedFeatures,
            selectedImage,
        };

        fetch('https://jsonplaceholder.typicode.com/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectedFeaturesData),
        })
            .then((response) => {
                if (response.ok) {
                    alert('Данные успешно отправлены на сервер');
                } else {
                    alert('Ошибка при отправке данных на сервер');
                }
            })
            .catch((error) => {
                alert('Произошла ошибка при отправке данных:', error);
            });
    };



    return (
        <Layout>
            <main>
                <section className={styles.container}>
                    <div className={styles.imageSection}>
                        <h2>Загрузите изображение:</h2>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className={styles.but}
                        />
                        {selectedImage && (
                            <div className={styles.selectedImage}>
                                <img src={selectedImage} alt="Selected Image" className={styles.melanoma} />
                            </div>
                        )}
                    </div>
                    <div className={styles.featureSection}>
                        <h2>Выберите признаки по Киттлеру:</h2>
                        <FeatureSelector
                            data={featuresData}
                            onSelect={handleFeatureSelect}
                            depth={0}
                            selectedFeatures={selectedFeatures}
                        />
                        <div className={styles.selectedFeatures}>
                            <h2>Выбранные признаки:</h2>
                            <ul className={styles.listContainer}>
                                {selectedFeatures.map((selected, depth) => (
                                    selected && (
                                        <li key={depth} className={styles.list}>
                                            {selected}
                                            <button onClick={() => handleFeatureRemove(depth)} className={styles.but} >
                                                Удалить
                                            </button>
                                        </li>
                                    )
                                ))}
                            </ul>
                        </div>
                    </div>
                    <button onClick={sendSelectedFeaturesToServer} className={styles.but} >Отправить на сервер</button>
                </section>
            </main>
        </Layout>
    );
}

export default Classifier;