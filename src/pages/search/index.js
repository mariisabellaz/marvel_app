import React, {useState, useEffect} from "react";
import {StatusBar} from 'expo-status-bar';
import {ApplicationProvider, Wrapper,} from "./styles";
import {SearchBar, Comics, Loading, NoData, EmptyData} from "../../components";
import {getImage} from "../../utils/getImage";
import {FlatList} from "react-native";

const columns = 2;

const SearchScreen = ({route, navigation}) => {

    const [loading, setLoading] = useState(true);
    const [comics, setComics] = useState(route.params.comics);
    const [searchTerm, setSearchTerm] = useState(route.params.comics);

    const searchResults = Object.values(comics).map((comic) => ({
        ...comic,
    })).sort((a, b) => a.title > b.title);

    function createRows(data, columns) {
        const rows = Math.floor(data.length / columns);
        let lastRowElements = data.length - rows * columns;

        while (lastRowElements !== columns) {
            data.push({
                id: `empty-${lastRowElements}`,
                name: `empty-${lastRowElements}`,
                empty: true,
            });
            lastRowElements += 1;
        }

        return data;
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);

         const newComics = searchResults.filter((comics) => comics);

         setComics(newComics);

    }, [searchTerm]);

    return (
        <ApplicationProvider>
            <StatusBar style="light"/>
            {
                loading
                    ?
                    <Loading/>
                    :
                    <Wrapper>
                        <SearchBar value={searchTerm} onChangeText={(value) => setSearchTerm(value)}/>
                        <FlatList
                            data={createRows(comics, columns)}
                            numColumns={columns}
                            keyExtractor={item => item.id}
                            ListEmptyComponent={() => (<NoData/>)}
                            renderItem={({item}) => {
                                if (item.empty) {
                                    return <EmptyData/>;
                                }
                                return (
                                    <Comics
                                        source={getImage(item)}
                                        onPress={() => navigation.navigate('Details', {comics: item})}
                                    />
                                );
                            }}
                            contentContainerStyle={{marginTop: 20}}
                            showsVerticalScrollIndicator={false}
                        />
                    </Wrapper>
            }
        </ApplicationProvider>
    );
};
export default SearchScreen;
