import React from "react";
import styles from "./index.module.css";
import { YMaps, Map, ObjectManager } from "react-yandex-maps";
import get from "../../../utils/get";
import post from "../../../utils/post";

import RectangleTitleMap from '../../../assets/image/RectangleTitleMap.svg'
import polyCircle from '../../../assets/image/polyCircle.svg'

export default ({ }) => {
    const [openAddComment, setOpenAddComment] = React.useState(false)
    const [mapInfo, setMapInfo] = React.useState([])
    const [selectedFacility, setSelectedFacility] = React.useState({ comments: [] })

    React.useEffect(() => {
        console.log('getMapInfo')
        getMapInfo()
    }, [])

    const getMapInfo = async () => {
        let data = await get('/api/getAllFacilitySportFacility', { table: 'sportObject' })

        data = data.map(e => ({ ...e, type: 'Feature' }))

        setMapInfo(data)
        setSelectedFacility(data[0])
    }

    const handleFacilityClick = (e) => {
        if (~e.get('objectId').indexOf('__cluster__')) {
            //Срабатывает при клике на кластер элементов
            return
        }

        let idClickFacility = e.get('objectId')

        let findedFacility = mapInfo.find(e => e.id == idClickFacility)

        setSelectedFacility(findedFacility)
    };

    const openTextareaAddComment = () => {
        setOpenAddComment(true)
    }

    const addComment = async () => {
        let text = document.getElementById('addCommentTextarea').value
        let data = await post('/api/addComment', {
            idFacility: selectedFacility.id,
            text: text,
            table: 'sportObject'
        })

        if (data.success) {
            selectedFacility.comments.unshift({
                text: text
            })

            setSelectedFacility({ ...selectedFacility })


            document.getElementById('addCommentTextarea').value = ''
        } 
    }

    return (
        <div className={styles.PageMaps}>
            <div className={styles.blockMapInfo}>
                <div className={styles.rectangleTitleMap}>
                    <img src={RectangleTitleMap} />
                </div>
                <h3 className={styles.title}>{selectedFacility['Название']}</h3>
                {selectedFacility["Дата_завершения_строительства_/_реконструкции"]
                    ? <span className={styles.date}>Действует с {selectedFacility["Дата_завершения_строительства_/_реконструкции"]}</span>
                    : ''
                }
                <span className={styles.desc} dangerouslySetInnerHTML={{ __html: `Тип спорт-комплекса: ${selectedFacility["Тип_спортивного_комплекса"]}. ${selectedFacility["Краткое_описание"]}` }}></span>
                {selectedFacility["Виды_спорта"]
                    ? <>
                        <span className={styles.typeSports}>Доступные виды спорта:</span>
                        <span className={styles.typeSportsList}>{selectedFacility["Виды_спорта"]}</span>
                    </>
                    : ''
                }
                {selectedFacility["Контактный_телефон_объекта"]
                    ? <span className={styles.phone}>Телефон: {selectedFacility["Контактный_телефон_объекта"]}</span>
                    : ''
                }
                <span className={styles.adress}>Адрес: {selectedFacility["Адрес"]}</span>
                <div className={styles.comment}>
                    <h3>Отзывы:</h3>
                    <div className={styles.commentList}>
                        {openAddComment
                            ? <div className={styles.addCommentsBlock} id="addCommentsBlock">
                                <textarea id="addCommentTextarea" placeholder="Ваш отзыв" />
                                <button onClick={addComment}>+</button>
                            </div>
                            : ''
                        }
                        {selectedFacility.comments.length
                            ? selectedFacility.comments.map((v, i) =>
                                <div key={i} className={styles.commentBlock}>
                                    <img src={polyCircle} />
                                    <span>{v.text}</span>
                                </div>
                            )
                            : !openAddComment
                                ? <span className={styles.noComments}>Еще никто не добавил комментарий будь первым.</span>
                                : ''
                        }
                    </div>
                    {!openAddComment
                        ? <span onClick={openTextareaAddComment} className={styles.addComments}>Добавить отзыв</span>
                        : ''
                    }

                </div>
                <YMaps >
                    <div className={styles.map}>
                        <Map width="100%" height="100%" defaultState={{ center: [55.75, 37.57], zoom: 9 }} >
                            <ObjectManager
                                options={{
                                    clusterize: true,
                                }}
                                objects={{
                                    openBalloonOnClick: true,
                                    preset: 'islands#greenDotIcon'
                                }}
                                clusters={{
                                    preset: 'islands#redClusterIcons'
                                }}
                                features={mapInfo}
                                onClick={handleFacilityClick}
                                modules={['objectManager.addon.objectsBalloon']}
                            />
                            {/* <Clusterer options={{
                                preset: 'islands#invertedVioletClusterIcons',
                                groupByCoordinates: false
                            }}>
                                {mapInfo.map((facility) => (
                                    <Placemark key={Number(facility.id)} geometry={[facility["Яндекс_координата_центра_Y"], facility["Яндекс_координата_центра_X"]]} properties={{ hintContent: facility["Название"] }} />
                                ))}
                            </Clusterer> */}
                        </Map>
                    </div>
                </YMaps>
            </div>
        </div>


    );
};
